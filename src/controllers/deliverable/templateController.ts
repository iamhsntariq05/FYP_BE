import { createARubric } from "../../services/rubric/rubricService";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplate,
  getTemplateById,
  updateTemplate,
} from "../../services/template/templateService";
import { BadRequest } from "../../utils/errors";

export const getDeliverableTemplateById = async (
  req: any,
  res: any,
  next: any
) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const temp = await getTemplateById(id);
    res.send({ message: `Template successfully fetched!`, temp });
  } catch (ex) {
    next(ex);
  }
};
export const getDeliverableTemplate = async (req: any, res: any, next: any) => {
  const obj = req.body;
  try {
    if (!obj) {
      throw new BadRequest("Missing required field: query object");
    }
    const temp = await getTemplate(obj);
    res.send({ message: `Template successfully fetched!`, temp });
  } catch (ex) {
    next(ex);
  }
};
export const updateDeliverableTemplate = async (
  req: any,
  res: any,
  next: any
) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    const temp = await updateTemplate(id, obj);
    res.send({ message: `Template successfully updated!`, temp });
  } catch (ex) {
    next(ex);
  }
};
export const deleteDeliverableTemplate = async (
  req: any,
  res: any,
  next: any
) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new BadRequest("Missing required field: id");
    }
    await deleteTemplate(id);
    res.send({ message: `Template deleted successfully!` });
  } catch (ex) {
    next(ex);
  }
};
export const createDeliverableTemplate = async (
  req: any,
  res: any,
  next: any
) => {
  const file = req.file;
  const obj = req.body;
  // console.log(file, obj);
  //   return;

  try {
    if (!obj) {
      throw new BadRequest("Missing required field: obj");
    }
    const TemplateObj = {
      title: obj.title,
      deliverable: obj.deliverable,
      file: file.buffer,
    };
    const temp = await createTemplate(TemplateObj);
    res.send({ message: `Template created successfully!`, temp });
  } catch (ex) {
    next(ex);
  }
};
export const getAllDeliverableTemplates = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const temps = await getAllTemplates();
    res.send({ message: `Templates successfully fetched!`, templates: temps });
  } catch (ex) {
    next(ex);
  }
};
