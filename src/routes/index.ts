import { Router } from "express";
import AuthRouter from "./auth";
import StudentRouter from "./student";
import FacultyRouter from "./faculty";
import ExternalRouter from "./external";
import StudentProjectRouter from "./projects";
import StudentGroupRouter from "./groups";

import MeetingRouter from "./meeting";
import SchedulerRouter from "./automatedScheduler";

import Batchrouter from "./batch";

import ComplaintRouter from "./complaint";
// @ts-ignore
import DeliverableRouter from "./Deliverable";
import SubmittedDeliverable from "./SubmitttedDeliverable";
import facultyStudentRelationship from "./FacultyStudentRelationship";
import AdminRouter from "./admin";
// @ts-ignore
import TemplateRouter from "./Deliverable/template";
import RubricRouter from "./rubric";
import PlagarismCheckerRouter from "./plagarismChecker";

const router = Router();

// auth router
router.use("/auth", AuthRouter);

// student projects router
router.use("/project", StudentProjectRouter);

// student groups router
router.use("/group", StudentGroupRouter);

// student router
router.use("/students", StudentRouter);

// faculty router
router.use("/faculty", FacultyRouter);

// admin router
router.use("/admin", AdminRouter);

// external router
router.use("/external", ExternalRouter);

// complaint router
router.use("/complaint", ComplaintRouter);

// Deliverable router
router.use("/deliverable", DeliverableRouter);

// Batch router
router.use("/batch", Batchrouter);

// Submitted Deliverable router
router.use("/submitted_deliverable", SubmittedDeliverable);
// Submitted Deliverable router
router.use("/faculty_student_relationship", facultyStudentRelationship);
// deliverable router
// router.use("/deliverable", DeliverableRouter);

// deliverable router
router.use("/template", TemplateRouter);

// rubric router
router.use("/rubric", RubricRouter);
// Meeting router
router.use("/meeting", MeetingRouter);
// scheduler router
router.use("/scheduler", SchedulerRouter);

// PlagarismChecker router
router.use("/plagarism-checker", PlagarismCheckerRouter);

export default router;
