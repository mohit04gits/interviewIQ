// import jwt from "jsonwebtoken";

// const isAuth = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res.status(400).json({
//         message: "User does not have token",
//       });
//     }

//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//     if (!verifyToken) {
//       return res.status(400).json({
//         message: "Invalid token",
//       });
//     }

//     req.userId = verifyToken.userId;

//     next();

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       message: "isAuth error",
//     });
//   }
// };

// export default isAuth;

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },

  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename); // ✅ use the variable
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
