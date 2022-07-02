import { Deliverable } from "../../models";
import { FacultyStudentRelationship } from "../../models";
import { BadRequest } from "../../utils/errors";
import * as DeliverableService from "../../services/deliverable/deliverableService";
import EvaluatorTeam from "../../models/EvaluatorTeam";
import { Submitterd_deliverable } from "../../models";



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
  let id = req.params.id;
  console.log("The incomign id has", id);


  // Getting all the records array
  const allData = await EvaluatorTeam.find({});

  let students: string[] = [];

  // Checking if the emply exists in each record and getting all the ids of the students from there
  Promise.all(
    allData.map(async (items) => {

      // console.log("each item has", items);
      let faculty: string[] = [];
      faculty = items.faculty;
      // console.log("The faculty has", faculty);

      if (faculty.includes(id)) {
        // console.log("includes", items);
        // Getting all students id
        const groups = items.group;
        groups.forEach(student => {
          // console.log("The student has", student);
          students.push(student);

        })
      }
    })
  )

  // console.log("students ids", students);

  //Getting the each student record from submitted deliverables
  const studentsDeliverabels = await Submitterd_deliverable.find({ student_ID: { $in: students } });
  console.log("All the students submitted deliverabels are ", studentsDeliverabels);

  // res.send({ message: `Deliverable successfully updated!`, data:studentsDeliverabels });

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