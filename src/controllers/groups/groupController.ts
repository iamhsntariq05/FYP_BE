import * as studentGroupService from "../../services/groups/groupsService";
import { IStudentGroup } from "../../types";
import { BadRequest } from "../../utils/errors";

export const createStudentGroup = async (req: any, res: any, next: any) => {
  const obj = req.body;
  try {
    if (!obj) {
      throw new BadRequest("Missing required field for group creation!");
    }
    const group: IStudentGroup = await studentGroupService.create(obj);
    res.send({ message: `Student group successfully created!`, group });
  } catch (ex) {
    next(ex);
  }
};

export const getStudentGroup = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const group: IStudentGroup = await studentGroupService.getGroup(id);
    res.send({ message: `Student group successfully fetched!`, group });
  } catch (ex) {
    next(ex);
  }
};
export const getMyStudentGroup = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: student id");
    }
    const group: IStudentGroup = await studentGroupService.getMyGroup(id);
    res.send({ message: `Student group successfully fetched!`, group });
  } catch (ex) {
    next(ex);
  }
};

export const getAllStudentGroups = async (req: any, res: any, next: any) => {
  try {
    const groups: IStudentGroup[] = await studentGroupService.getAllGroups();
    res.send({ message: `Student groups successfully fetched!`, groups });
  } catch (ex) {
    next(ex);
  }
};

export const updateStudentGroup = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    if (!id || !obj) {
      throw new BadRequest("Missing required field: id and updated fields");
    }
    const group: IStudentGroup = await studentGroupService.updateGroup(id, obj);
    res.send({ message: `Student group successfully updated!`, group });
  } catch (ex) {
    next(ex);
  }
};

export const deleteStudentGroup = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    await studentGroupService.deleteGroup(id);
    res.send({ message: `Student group successfully deleted!` });
  } catch (ex) {
    next(ex);
  }
};

export const sendRequestToStudentGroup = async (
  req: any,
  res: any,
  next: any
) => {
  const groupId = req.params.id;
  const { studentId } = req.body;
  try {
    if (!groupId || !studentId) {
      throw new BadRequest("Missing required field: group id and studentId");
    }
    const group: IStudentGroup | null = await studentGroupService.sentRequest(
      groupId,
      studentId
    );    
    return res.send({ message: `Request sent to Student group successfully!`, group });
  } catch (ex) {
    console.log(ex);
    
    next(ex);
  }
};
export const acceptRequestToStudentGroup = async (
  req: any,
  res: any,
  next: any
) => {
  const groupId = req.params.id;
  const { studentId, reqId } = req.body;
  try {
    if (!groupId || !studentId || !reqId) {
      throw new BadRequest(
        "Missing required field: group id,reqId and studentId"
      );
    }
    const group: IStudentGroup | null = await studentGroupService.acceptRequest(
      groupId,
      studentId,
      reqId
    );
    res.send({
      message: `Request approved to Student group successfully!`,
      group,
    });
  } catch (ex) {
    next(ex);
  }
};
export const rejectRequestToStudentGroup = async (
  req: any,
  res: any,
  next: any
) => {
  const groupId = req.params.id;
  const { studentId, reqId } = req.body;
  try {
    if (!groupId || !studentId || !reqId) {
      throw new BadRequest(
        "Missing required field: group id,reqId and studentId"
      );
    }
    const group: IStudentGroup | null = await studentGroupService.rejectRequest(
      groupId,
      studentId,
      reqId
    );
    res.send({
      message: `Request rejected to Student group successfully!`,
      group,
    });
  } catch (ex) {
    next(ex);
  }
};
export const withdrawRequestToStudentGroup = async (
  req: any,
  res: any,
  next: any
) => {
  const groupId = req.params.id;
  const { studentId } = req.body;
  
  try {
    if (!groupId || !studentId) {
      throw new BadRequest("Missing required field: group id and studentId");
    }
    
    const group: IStudentGroup | null =
      await studentGroupService.withdrawRequest(groupId, studentId);
    res.send({
      message: `Request Withdrawn to Student group successfully!`,
      group,
    });
  } catch (ex) {
    next(ex);
  }
};
export const joinStudentGroup = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  const { studentId } = req.body;
  try {
    if (!id || !studentId) {
      throw new BadRequest("Missing required field: id and studentId");
    }
    const group: IStudentGroup | null = await studentGroupService.joinGroup(
      id,
      studentId
    );
    res.send({ message: `Request sent to Student group successfully!`, group });
  } catch (ex) {
    next(ex);
  }
};
