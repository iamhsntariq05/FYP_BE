import { Router } from "express";
import {
    addbatch,
    getallbatch,
    deleteBatch
} from "../../controllers/batch/batchController";

const router = Router();

// add compalint
// api/batch/add
router.post("/add", addbatch);

//get batch
// api/batch/
router.get("/", getallbatch);

//delete batch
// api/batch/:id

router.delete("/:id", deleteBatch);

export default router;  
