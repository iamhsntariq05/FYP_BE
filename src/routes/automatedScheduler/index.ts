import { Router } from "express";
import {
  uploadAdminPhoto,
  getadminprofile,
} from "../../controllers/admin/adminController";
import {
  addTimeSlots,
  assignGroupsToTeams,
  createEvaluatorTeams,
  getEvaluatorTeams,
} from "../../controllers/automatedScheduler/schedulerController.";
import { withAuth, upload } from "../../middleware/auth";
const router = Router();

// api/scheduler/time-slots/:id
router.patch("/time-slots/:id", withAuth, addTimeSlots);

// api/scheduler/create/evaluator-teams
router.post("/create/evaluator-teams", withAuth, createEvaluatorTeams);

// api/scheduler/all-evaluator-teams
router.get("/all-evaluator-teams", withAuth, getEvaluatorTeams);

// api/scheduler/assign-groups
router.patch("/assign-groups", withAuth, assignGroupsToTeams);

export default router;
