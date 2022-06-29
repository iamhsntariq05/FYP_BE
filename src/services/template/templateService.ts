import Template from "../../models/Template";
import { ITemplate } from "../../types";
import { NotFound } from "../../utils/errors";

export const IsTemplateExist = async (id: string) => {
  const temp: ITemplate | null = await Template.findById(
    id
  ).exec();
  return !!temp;
};

export const getTemplateById = async (id: string) => {
  const temp: ITemplate | null = await Template.findById(id)
    .populate("deliverable")
    .exec();
  if (!temp) {
    throw new NotFound(`Template with id ${id} not found!`);
  }
  return temp;
};
export const getTemplate = async (obj: any) => {
  const temp: ITemplate | null = await Template.findOne(obj)
    .populate("deliverable")
    .exec();
  if (!temp) {
    throw new NotFound(`Template not found!`);
  }
  return temp;
};

export const getAllTemplates = async () => {
  const temps: ITemplate[] | null = await Template.find({})
    .populate("deliverable")
    .exec();
  if (!temps) {
    throw new NotFound(`No Templates found!`);
  }
  return temps;
};

export const updateTemplate = async (id: string, obj: any) => {
  const temp: ITemplate | null = await Template.findByIdAndUpdate(
    id,
    obj
  ).exec();
  if (!temp) {
    throw new NotFound(`Template with id ${id} not found!`);
  }
  return temp;
};
export const deleteTemplate = async (id: string) => {
  const temp: ITemplate | null = await Template.findByIdAndDelete(
    id
  ).exec();
  if (!temp) {
    throw new NotFound(`Template with id ${id} not found!`);
  }
};
export const createTemplate = async (obj: any) => {
  const temp: ITemplate | null = await Template.create(obj);
  if (!temp) {
    throw new NotFound(`Template not created!`);
  }
  return temp;
};
