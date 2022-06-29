import * as DeliverableService from "../../services/deliverable/deliverableService";
import { createARubric } from "../../services/rubric/rubricService";
import { BadRequest } from "../../utils/errors";
import FacultyStudentRelationship from "../../models/FacultyStudentRelationship";
import Deliverable from "../../models/Deliverable";

export const getDeliverable = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const deliverable = await DeliverableService.getDeliverable(id);
    res.send({ message: `Deliverable successfully fetched!`, deliverable });
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
// export const deleteDeliverable = async (req: any, res: any, next: any) => {
//   const id = req.params.id;
//   try {
//     if (!id) {
//       throw new BadRequest("Missing required field: id");
//     }
//     await DeliverableService.deleteById(id);
//     res.send({ message: `Deliverable deleted successfully!` });
//   } catch (ex) {
//     next(ex);
//   }
// };

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
export const createDeliverable = async (req: any, res: any, next: any) => {
  const obj = req.body;
  try {
    if (!obj) {
      throw new BadRequest("Missing required field: obj");
    }
    const rubricObj = {
      rubricItem: [...obj.rubrics],
    };
    const rubric = await createARubric(rubricObj);
    const deliverableObj = {
      title: obj.title,
      deadline: obj.deadline,
      rubric: rubric._id,
    };
    const deliverable = await DeliverableService.createDeliverable(
      deliverableObj
    );
    res.send({ message: `Deliverable created successfully!`, deliverable });
  } catch (ex) {
    next(ex);
  }
};
// export const getAllDeliverables = async (req: any, res: any, next: any) => {
//   try {
//     const deliverables = await DeliverableService.getAllDeliverables();
//     res.send({ message: `Deliverables successfully fetched!`, deliverables });
//   } catch (ex) {
//     next(ex);
//   }
// };
export const getallDeliverbles = async (req: any, res: any, next: any) => {
  const allDeliverables = await Deliverable.find();
  res.send(allDeliverables);
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

export const getAllDeliverablesByStudentId = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const fId: any = await FacultyStudentRelationship.findOne({
      student: req.params.id,
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

