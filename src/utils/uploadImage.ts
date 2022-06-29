import multer from "multer";

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

// const fileFilter = (req: Request, file: any, cb: any) => {
//   // reject a file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
export const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    //   fileFilter: fileFilter,
}).single("profile");

const audioStorage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now().toString(16) + "-" + file.fieldname + ".mp3");
    },
});

export const audioUpload = multer({
    // preservePath: true,
    storage: audioStorage,
}).single("audio");
// const upload = multer({
//   storage: storage,
//   limits : {fileSize : 1000000}
// });