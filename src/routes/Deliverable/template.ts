import { Router } from "express";
import * as TemplateController from "../../controllers/deliverable/templateController";
import { withAuth } from "../../middleware/auth";
import { uploadFile } from "../../utils/uploadFile";

const router = Router();

// get all templates
// api/template/all
router.get("/all", withAuth, TemplateController.getAllDeliverableTemplates);

// get one template
// api/template/:id
router.get("/:id", withAuth, TemplateController.getDeliverableTemplateById);

// get all templates
// api/template
router.get("/", withAuth, TemplateController.getDeliverableTemplate);


// update template
// api/template/:id
router.patch("/:id", withAuth, TemplateController.updateDeliverableTemplate);

// create template
// api/template
router.post(
  "/",
  uploadFile,
  TemplateController.createDeliverableTemplate
);

// delete template
// api/template/:id
router.delete("/:id", withAuth, TemplateController.deleteDeliverableTemplate);

export default router;
