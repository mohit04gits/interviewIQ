import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname; //READ ABOUT THIS
    cb(null, "filename");
  },
});

//middleware

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  //5mb limits
});
