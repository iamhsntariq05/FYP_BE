import { groupCollapsed } from "console";
import { Student, StudentGroup } from "../../models";
import { IStudent, IStudentGroup } from "../../types";
import { InternalConflict, NotFound } from "../../utils/errors";
import { getStudent } from "../student/studentService";

export const IsGroupExist = async (id: string) => {
  const group: IStudentGroup | null = await StudentGroup.findById(id).exec();
  return !!group;
};
export const create = async (obj: any) => {
  // const groupExists = await IsGroupExist(groupId);
  // if (!groupExists)
  //   throw new NotFound(`Student Group with id ${groupId} not found!`);
  const group: IStudentGroup | null = await StudentGroup.create({
    ...obj,
    students: [obj.leaderId],
  });
  if (!group) {
    throw new NotFound(`Student Group is not created!`);
  }
  const st: any = await Student.findByIdAndUpdate(
    obj.leaderId,
    {
      group: group._id,
    },
    { new: true, upsert: true }
  ).exec();
  return group;
};
export const getGroup = async (id: string) => {
  const group: IStudentGroup | null = await StudentGroup.findById(id)
    .populate("requests.student")
    .populate("students")
    .populate("projectId")
    .populate("facultyId")
    .exec();
  if (!group) {
    throw new NotFound(`Student Group with id ${id} not found!`);
  }
  return group;
};
export const getMyGroup = async (id: string) => {
  const student: IStudent | null = await getStudent(id);
  if (!student) throw new NotFound(`Student with id ${id} not found!`);
  const group: IStudentGroup | null = await StudentGroup.findById(
    student?.group
  )
    .populate("requests.student")
    .populate("students")
    .populate("projectId")
    .populate("facultyId")
    .exec();
  if (!group) {
    throw new NotFound(`Student Group not found!`);
  }
  return group;
};
export const getMyGroupProject = async (id: string) => {
  const student: IStudent | null = await getStudent(id);
  if (!student) throw new NotFound(`Student with id ${id} not found!`);
  const group: IStudentGroup | null = await StudentGroup.findById(
    student?.group
  )
    .populate("requests.student")
    .populate("students")
    .populate("facultyId")
    .exec();
  if (!group) {
    throw new NotFound(`Student Group not found!`);
  }
  return group;
};

export const getAllGroups = async () => {
  const groups: IStudentGroup[] | null = await StudentGroup.find({})
    .populate("leaderId")
    .exec();
  if (!groups) {
    throw new NotFound(`No Student Groups found!`);
  }
  return groups;
};

export const updateGroup = async (id: string, obj: any) => {
  const group: IStudentGroup | null = await StudentGroup.findByIdAndUpdate(
    id,
    obj
  ).exec();
  if (!group) {
    throw new NotFound(`Student Group with id ${id} not found!`);
  }
  return group;
};

export const deleteGroup = async (id: string) => {
  const groupExists: boolean = await IsGroupExist(id);
  if (!groupExists) {
    throw new NotFound(`Student Group with id ${id} not found!`);
  }
  await StudentGroup.findByIdAndDelete(id).exec();
};
// send request to student group
export const sentRequest = async (groupId: string, studentId: string) => {
  const groupExists = await IsGroupExist(groupId);
  if (!groupExists)
    throw new NotFound(`Student Group with id ${groupId} not found!`);
  // check if  student already send request for this group
  const checkStudent: IStudent | null = await Student.findById(studentId);
  // @ts-ignore
  if (checkStudent && checkStudent?.requestSent.includes(groupId)) {
    throw new InternalConflict(`Request for Student Group already sent!`);
  }
  // check if student already has a group
  // @ts-ignore
  if (checkStudent && checkStudent.group) {
    throw new InternalConflict(`Student already has a Group!`);
  }

  // Sent request to group
  const groupReqObj = {
    student: studentId,
    status: "pending",
  };
  const group = await StudentGroup.findByIdAndUpdate(
    groupId,
    {
      $push: {
        requests: groupReqObj,
      },
    },
    { new: true, upsert: true }
  ).exec();
  // save group request id in student
  await Student.findByIdAndUpdate(
    studentId,
    {
      $push: { requestSent: groupId },
    },
    { new: true, upsert: true }
  ).exec();
  return group;
};
// withdraw request to student group
export const withdrawRequest = async (groupId: string, studentId: string) => {
  const grp: any = await StudentGroup.findById(groupId);
  if (!grp) throw new NotFound(`Student Group with id ${groupId} not found!`);
  const findReqId = grp.requests.filter(
    (req: any) => req.student !== studentId
  );

  const group = await StudentGroup.findByIdAndUpdate(
    groupId,
    {
      $pull: {
        requests: {
          _id: { $in: findReqId[0]?._id },
        },
      },
    },
    { new: true, upsert: true }
  ).exec();

  // remove group request id in student
  await Student.findByIdAndUpdate(studentId, {
    $pull: { requestSent: groupId },
  });
  return group;
};

// accept request of student to student group
export const acceptRequest = async (
  groupId: string,
  studentId: string,
  reqId: string
) => {
  const groupExists = await IsGroupExist(groupId);
  if (!groupExists)
    throw new NotFound(`Student Group with id ${groupId} not found!`);

  const student = await getStudent(studentId);
  if (student?.group) throw new NotFound(`Student already has a group!`);
  const group = await StudentGroup.findOneAndUpdate(
    { _id: groupId, "requests._id": reqId },
    {
      $set: { "requests.$.status": "accept" },
    },
    { new: true, upsert: true }
  ).exec();
  // add student in group
  await StudentGroup.findByIdAndUpdate(
    groupId,
    {
      $push: {
        students: studentId,
      },
    },
    { new: true, upsert: true }
  );
  // add group in student
  const st: IStudent | null = await Student.findByIdAndUpdate(studentId, {
    group: groupId,
  }).exec();

  return group;
};
// accept request of student to student group
export const rejectRequest = async (
  groupId: string,
  studentId: string,
  reqId: string
) => {
  const groupExists = await IsGroupExist(groupId);
  if (!groupExists)
    throw new NotFound(`Student Group with id ${groupId} not found!`);

  const student = await getStudent(studentId);
  // if (student?.group) throw new NotFound(`Student already has a group!`);
  const group = await StudentGroup.findOneAndUpdate(
    { _id: groupId, "requests._id": reqId },
    {
      $pull: { requests: { _id: reqId } },
    },
    { new: true, upsert: true }
  ).exec();
  // remove req student in group
  await Student.findByIdAndUpdate(studentId, {
    $pull: { requestSent: groupId },
  });
  return group;
};
export const requestReceived = async (
  groupId: string,
  studentId: string,
  reqId: string
) => {
  const groupExists = await IsGroupExist(groupId);
  if (!groupExists)
    throw new NotFound(`Student Group with id ${groupId} not found!`);
  // Withdraw( remove) request to group
  const groupReqObj = {
    student: studentId,
    // status: "pending",
  };
  const group = await StudentGroup.findByIdAndUpdate(
    { _id: groupId, "requests._id": reqId },
    {
      $pull: { "requests.$._id": reqId },
    }
  );
  // remove group request id in student
  await Student.findByIdAndUpdate(studentId, {
    $pull: { requestSent: groupId },
  });
  return group;
};

// invite to group
// request received
// join group -> request sent
export const joinGroup = async (id: string, studentId: any) => {
  const groupExists = await IsGroupExist(id);
  if (!groupExists)
    throw new NotFound(`Student Group with id ${id} not found!`);
  await StudentGroup.updateOne(
    { _id: id, "requests.student": "61b06096c7b65cfb9161f5a9" },
    { $set: { "requests.$.status": "accept" } }
  );
  const group = await StudentGroup.findById(id);
  return group;
};
