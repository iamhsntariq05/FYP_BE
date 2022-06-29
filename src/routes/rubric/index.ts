import { Router } from "express";
import { createRubric, getAllRubrics, getRubric, updateRubric } from "../../controllers/rubric/rubricController";
import { withAuth } from "../../middleware/auth";

const router = Router();

// get one rubric
// api/rubric/:id
router.get("/:id", withAuth, getRubric);

// get all rubrics
// api/rubric
router.get("/", withAuth, getAllRubrics);

// update rubric
// api/rubric/:id
router.patch("/:id", withAuth, updateRubric);

// create rubric
// api/rubric
router.post("/", withAuth, createRubric);

// delete rubric
// api/rubric/:id
// router.delete("/:id", withAuth, deleteExternalProfile);

export default router;
