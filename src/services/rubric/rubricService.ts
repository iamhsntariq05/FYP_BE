import { Rubric } from "../../models";
import { IRubric } from "../../types";
import { NotFound } from "../../utils/errors";

export const IsRubricExist = async (id: string) => {
  const rubric: IRubric | null = await Rubric.findById(id).exec();
  return !!rubric;
};

export const getOneRubric = async (id: string) => {
  const rubric: IRubric | null = await Rubric.findById(id).exec();
  if (!rubric) {
    throw new NotFound(`Rubric with id ${id} not found!`);
  }
  return rubric;
};

export const getAllRubrics = async () => {
  const rubrics: IRubric[] | null = await Rubric.find({}).exec();
  if (!rubrics) {
    throw new NotFound(`No rubrics found!`);
  }
  return rubrics;
};

export const updateOneRubric = async (id: string, obj: any) => {
  const rubric: IRubric | null = await Rubric.findByIdAndUpdate(id, obj).exec();
  if (!rubric) {
    throw new NotFound(`Rubric with id ${id} not found!`);
  }
  return rubric;
};
export const createARubric = async (obj: any) => {
  const rubric: IRubric | null = await Rubric.create(obj);
  if (!rubric) {
    throw new NotFound(`Rubric not created!`);
  }
  return rubric;
};
