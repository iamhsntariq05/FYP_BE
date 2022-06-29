import { Project, StudentGroup } from "../../models";
import { IProject } from "../../types";
import { InternalConflict, NotFound } from "../../utils/errors";

export const IsProjectExist = async (id: string) => {
  const project: IProject | null = await Project.findById(id).exec();
  return !!project;
};
export const create = async (obj: any) => {
  const project: IProject | null = await Project.create(obj);
  if (!project) {
    throw new NotFound(`project is not created!`);
  }
  return project;
};
export const getProject = async (id: string) => {
  const project: IProject | null = await Project.findById(id).exec();
  if (!project) {
    throw new NotFound(`project with id ${id} not found!`);
  }
  return project;
};

export const getAllProjects = async () => {
  const projects: IProject[] | null = await Project.find({})
    .populate("requests.group")
    .exec();
  if (!projects) {
    throw new NotFound(`No project found!`);
  }
  return projects;
};

export const updateProject = async (id: string, obj: any) => {
  const project: IProject | null = await Project.findByIdAndUpdate(
    id,
    obj
  ).exec();
  if (!project) {
    throw new NotFound(`project with id ${id} not found!`);
  }
  return project;
};

export const deleteProject = async (id: string) => {
  const projectExists: boolean = await IsProjectExist(id);
  if (!projectExists) {
    throw new NotFound(`project with id ${id} not found!`);
  }
  await Project.findByIdAndDelete(id).exec();
};

export const applyProject = async (id: string, groupId: string) => {
  const proj: any = await Project.findById(id);
  if (!proj) {
    throw new NotFound(`Project with id ${id} not found!`);
  }
  //  check if req already sent
  const checkProjects = proj?.requests?.filter(
    (req: any) => req.group !== groupId
  );
  if (checkProjects.length > 0) {
    throw new InternalConflict(`Request for Student Project already sent!`);
  }
  if (proj.status === "notAvailable") {
    throw new InternalConflict(`Project not available!`);
  }
  // send project request
  const projectReqObj = {
    group: groupId,
    status: "pending",
  };
  const project = await Project.findByIdAndUpdate(
    id,
    {
      $push: {
        requests: projectReqObj,
      },
    },
    { new: true, upsert: true }
  ).exec();
  return project;
};
export const acceptProjectRequest = async (id: string, groupId: string) => {
  const proj: any = await Project.findById(id);
  if (!proj) {
    throw new NotFound(`Project with id ${id} not found!`);
  }

  const project = await Project.findByIdAndUpdate(
    id,
    {
      $pull: {
        requests: {
          group: { $in: groupId },
        },
      },
    },
    { new: true, upsert: true }
  ).exec();
  // save project in group
  await StudentGroup.findByIdAndUpdate(
    groupId,
    {
      projectId: id,
      status: "notAvailable",
    },
    { new: true, upsert: true }
  ).exec();
  await StudentGroup.findByIdAndUpdate(
    groupId,
    {
      facultyId: project.facultyId,
    },
    { new: true, upsert: true }
  ).exec();
  return project;
};
export const rejectProjectRequest = async (id: string, groupId: string) => {
  const proj: any = await Project.findById(id);
  if (!proj) {
    throw new NotFound(`Project with id ${id} not found!`);
  }
  const project = await Project.findByIdAndUpdate(
    id,
    {
      $pull: {
        requests: {
          group: { $in: groupId },
        },
      },
    },
    { new: true, upsert: true }
  ).exec();
  return project;
};
export const proposeProject = async (id: string) => {
  const projectExists: boolean = await IsProjectExist(id);
  if (!projectExists) {
    throw new NotFound(`project with id ${id} not found!`);
  }
  await Project.findByIdAndDelete(id).exec();
};
