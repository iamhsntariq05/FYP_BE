import { Router } from "express";
import * as studentGroupController from "../../controllers/groups/groupController";
import { withAuth } from "../../middleware/auth";

const router = Router();

// create student group
// api/group
router.post("/", withAuth, studentGroupController.createStudentGroup);

// get all student groups
// api/group/
router.get("/", withAuth, studentGroupController.getAllStudentGroups);

// get student groups
// api/group/:id
router.get("/:id", withAuth, studentGroupController.getStudentGroup);

// get my student groups
// api/group/:id
router.get("/my/:id", withAuth, studentGroupController.getMyStudentGroup);

// update student group
// api/group/:id
router.patch("/:id", withAuth, studentGroupController.updateStudentGroup);

// delete student group
// api/group/:id
router.delete("/:id", withAuth, studentGroupController.deleteStudentGroup);

// send request to student group
// api/group/sendRequest/:id
router.patch("/sendRequest/:id", studentGroupController.sendRequestToStudentGroup);

// accept request to student group
// api/group/acceptRequest/:id
router.patch("/acceptRequest/:id", studentGroupController.acceptRequestToStudentGroup);

// reject request to student group
// api/group/rejectRequest/:id
router.patch("/rejectRequest/:id", studentGroupController.rejectRequestToStudentGroup);

// withdraw request to student group
// api/group/withdrawRequest/:id
router.patch("/withdrawRequest/:id", studentGroupController.withdrawRequestToStudentGroup);


// join student group
// api/group/join/:id
router.patch("/join/:id", withAuth, studentGroupController.joinStudentGroup);

export default router;
