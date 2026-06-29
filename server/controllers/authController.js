// //data from frontend

// import genToken from "../config/token";
// import User from "../models/userModel";

// //create user

// export const googleAuth = async (requestAnimationFrame, res) => {
//   try {
//     const { name, email } = req.body;
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//       });
//     }
//     let token = await genToken(user._id);
//     res.cookie("token", token, {
//       http: true,
//       secure: false,
//       samesite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // wHAT IS THIS
//     });
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `Google Auth Error ${error}` });
//   }
// };

// //LOGOUT
// export const logOut = async(req,res)=>{
//     try{
//         await res.clearCookie("token")
//         return res.status(200).json({message:"LogOut successfully"})
//     }catch(error){
//         return res.status(500).json({message:`LogOut Error ${error}`})
//     }

// }

import genToken from "../config/token.js";
import User from "../models/userModel.js";

// Google Login / Signup
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = await genToken(user._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // Change to true when deploying with HTTPS
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
export const logOut = async (req, res) => {
  try {
    // res.clearCookie("token");

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
