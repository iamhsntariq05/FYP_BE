import multer from "multer";

// storage not to store file locally
let storage = multer.memoryStorage();
// multer file upload
export const uploadFile = multer({ storage: storage }).single("file");
