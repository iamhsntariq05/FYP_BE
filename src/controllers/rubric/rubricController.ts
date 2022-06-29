import * as rubricService from "../../services/rubric/rubricService";
import { BadRequest } from "../../utils/errors";

export const getRubric = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const rubric = await rubricService.getOneRubric(id);
    res.send({ message: `Rubric successfully fetched!`, rubric });
  } catch (ex) {
    next(ex);
  }
};
export const updateRubric = async (req: any, res: any, next: any) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const rubric = await rubricService.updateOneRubric(id, obj);
    res.send({ message: `Rubric successfully updated!`, rubric });
  } catch (ex) {
    next(ex);
  }
};
export const createRubric = async (req: any, res: any, next: any) => {
  const obj = req.body;
  try {
    if (!obj) {
      throw new BadRequest("Missing required field: obj");
    }
    const rubric = await rubricService.createARubric(obj);
    res.send({ message: `Rubric created successfully!`, rubric });
  } catch (ex) {
    next(ex);
  }
};
export const getAllRubrics = async (req: any, res: any, next: any) => {
  try {
    const rubrics = await rubricService.getAllRubrics();
    res.send({ message: `Rubrics successfully fetched!`, rubrics });
  } catch (ex) {
    next(ex);
  }
};
