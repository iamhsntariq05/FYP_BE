import { Router } from "express";
import { loginAdmin, registerAdmin } from "../../controllers/auth/adminAuthController";
import { loginCoordinator, registerCoordinator } from "../../controllers/auth/coordinatorAuthController";
import { loginExternal, registerExternal } from "../../controllers/auth/externalAuthController";
import { loginFaculty, registerFaculty, registerFacultyBatch } from "../../controllers/auth/facultyAuthController";
import { loginStudent, registerStudent, registerStudentBatch } from "../../controllers/auth/studentAuthController";
import { withAuth } from "../../middleware/auth";
import { uploadFile } from "../../utils/uploadFile";
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
// const upload = multer({ dest: 'tmp/csv/' });

const router = Router();
// register students in a batch
// api/auth/student/signup
// router.post("/student/signup/batch",upload.single('file'), registerStudentBatch);
router.post("/student/signup/batch",uploadFile, registerStudentBatch);

// register student
// api/auth/student/signup
router.post("/student/signup", registerStudent);

// login student
// api/auth/student/login
router.post("/student/login", loginStudent);

// register coordinator
// api/auth/coordinator/signup
router.post("/coordinator/signup", registerCoordinator);

// login coordinator
// api/auth/coordinator/login
router.post("/coordinator/login", loginCoordinator);

// register faculty
// api/auth/faculty/signup
router.post("/faculty/signup", registerFaculty);

// register faculty
// api/auth/faculty/signup/batch
router.post("/faculty/signup/batch",uploadFile, registerFacultyBatch);

// login faculty
// api/auth/faculty/login
router.post("/faculty/login", loginFaculty);

// register external
// api/auth/external/signup
router.post("/external/signup", registerExternal);

// login external
// api/auth/external/login
router.post("/external/login", loginExternal);

// register admin
// api/auth/admin/signup
router.post("/admin/signup", registerAdmin);

// login admin
// api/auth/admin/login
router.post("/admin/login", loginAdmin);

router.get("/ok", withAuth, (req, res, next) => {
  res.status(200).send("Ticket Booked");
});

export default router;
