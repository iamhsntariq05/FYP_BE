import { Router } from "express";
import * as plagiarismController from "../../controllers/plagiarismChecker/plagiarismController";
import { withAuth } from "../../middleware/auth";

const router = Router();

// /plagarism-checker

// get auth token
router.get("/token", withAuth, plagiarismController.getPlagiarismAuthToken);

// post file to scan
router.put("/file/scan", plagiarismController.submitFile);

// download file to scan
router.get("/file/download", plagiarismController.downloadScannedReport);

router.post("/data", plagiarismController.data);

// export file async download
router.post(
  "/report/export",
  withAuth,
  plagiarismController.getPlagiarismAuthToken
);

// download file report
router.post(
  "/report/download",
  withAuth,
  plagiarismController.getPlagiarismAuthToken
);

export default router;
