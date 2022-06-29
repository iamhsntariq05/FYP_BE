import { Router } from "express";
import { uploadAdminPhoto,getadminprofile } from "../../controllers/admin/adminController";
import { withAuth ,upload} from "../../middleware/auth";
const router = Router();


// get admin profile
router.post("/upload_admin-photo", withAuth, upload, uploadAdminPhoto
);

// api/admin/:id
router.get("/:id", withAuth, getadminprofile);

export default router;