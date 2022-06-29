import { Router } from "express";
import {
  getAllMeeting,
  getMeeting,
  updateMeeting,
  verifyMeeting,
  createMeeting,
  deleteMeeting,
} from "../../controllers/meeting/meetingController";
import { withAuth } from "../../middleware/auth";

const router = Router();

// get one Meeting
// api/Meeting/:id
router.get("/:id", withAuth, getMeeting);

// get all Meetings
// api/Meeting
router.get("/", withAuth, getAllMeeting);

// update Meeting
// api/Meeting/:id
router.patch("/:id", withAuth, updateMeeting);

// update Meeting
// api/Meeting/:id
router.patch("/verify/:id", verifyMeeting);

// create Meeting
// api/Meeting
router.post("/", withAuth, createMeeting);

// delete Meeting
// api/Meeting/:id
router.delete("/:id", withAuth, deleteMeeting);

export default router;
