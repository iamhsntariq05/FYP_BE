import Deliverable from "../../models/Deliverable";
import { IDeliverable } from "../../types";
import { NotFound } from "../../utils/errors";

export const IsDeliverableExist = async (id: string) => {
  const deliverable: IDeliverable | null = await Deliverable.findById(
    id
  ).exec();
  return !!deliverable;
};

export const getDeliverable = async (id: string) => {
  const deliverable: IDeliverable | null = await Deliverable.findById(id)
    .populate("rubric")
    .exec();
  if (!deliverable) {
    throw new NotFound(`Deliverable with id ${id} not found!`);
  }
  return deliverable;
};

export const getAllDeliverables = async () => {
  const deliverables: IDeliverable[] | null = await Deliverable.find({})
    .populate("rubric")
    .exec();
  if (!deliverables) {
    throw new NotFound(`No deliverables found!`);
  }
  return deliverables;
};

export const updateDeliverable = async (id: string, obj: any) => {
  const deliverable: IDeliverable | null = await Deliverable.findByIdAndUpdate(
    id,
    obj
  ).exec();
  if (!deliverable) {
    throw new NotFound(`Deliverable with id ${id} not found!`);
  }
  return deliverable;
};
export const deleteById = async (id: string) => {
  const deliverable: IDeliverable | null = await Deliverable.findByIdAndDelete(
    id
  ).exec();
  if (!deliverable) {
    throw new NotFound(`Deliverable with id ${id} not found!`);
  }
};
export const createDeliverable = async (obj: any) => {
  const deliverable: IDeliverable | null = await Deliverable.create(obj);
  if (!deliverable) {
    throw new NotFound(`Deliverable not created!`);
  }
  return deliverable;
};
