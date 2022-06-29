import { Deliverable } from "../../models";
import { FacultyStudentRelationship } from "../../models";
import { BadRequest } from "../../utils/errors";
import * as DeliverableService from "../../services/deliverable/deliverableService";


export const addDeleiverable = async (req: any, res: any, next: any) => {
  const { userId, title, deadline, rubrics, faculty_id } = req.body;

  // console.log(faculty_id);

  const newDeliverable = new Deliverable({
    userId: req.body.userId,
    title,
    deadline,
    totalRubrics: rubrics,
    faculty_id,
  });
  try {
    const Deliverable = await newDeliverable.save();
    res.status(200).send({ message: `Deliverable successfully saved! haha`, Deliverable });
  } catch (error) {
    res.send(error);
  }
};

export const getallDeliverbles = async (req: any, res: any, next: any) => {
  const allDeliverables = await Deliverable.find();
  res.send(allDeliverables);
};

export const getAllDeliverablesByStudentId = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const fId: any = await FacultyStudentRelationship.findOne({
      student: req.params.id,
      // group: req.params.id,
    });

    if (!fId) {
      return res.send({ message: "No faculty is allocated to this student." });
    }

    const allDeliverables = await Deliverable.find({ faculty_id: fId.faculty });
    res.send(allDeliverables);
  } catch (error) {
    res.send(error);
  }
};

export const getAllDeliverablesByFacultyId = async (
  req: any,
  res: any,
  next: any
) => {
  let fId = req.params.id;
  const allDeliverables = await Deliverable.find({ faculty_id: fId });
  res.send(allDeliverables);
};

export const deleteDeliverbles = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    await DeliverableService.deleteById(id);
    res.send({ message: `Deliverbles successfully deleted!` });
  } catch (ex) {
    next(ex);
  }
};

export const updateDeliverable = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const deliverable = await DeliverableService.updateDeliverable(id, obj);
    res.send({ message: `Deliverable successfully updated!`, deliverable });
  } catch (ex) {
    next(ex);
  }
};