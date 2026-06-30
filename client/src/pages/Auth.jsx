// // import { BsRobot } from "react-icons/bs";
// // import { IoSparkles } from "react-icons/io5";
// // import { FcGoogle } from "react-icons/fc";

// // import { motion } from "motion/react";
// // import { signInWithPopup } from "firebase/auth";
// // import { auth, provider } from "../utils/firebase";
// // import axios from "axios";
// // import { serverUrl } from "../App";
// // import { useDispatch } from "react-redux";
// // import { setUserData } from "../redux/userSlice";

// // function Auth(isModel = false) {
// //   const dispatch = useDispatch()
// //   const handleGoogleAuth = async () => {
// //     try {
// //       const response = await signInWithPopup(auth, provider);

// //       console.log("Firebase Response:", response);

// //       const user = response.user;
// //       const name = user.displayName;
// //       const email = user.email;

// //       const result = await axios.post(
// //         serverUrl + "/api/auth/google",
// //         { name, email },
// //         { withCredentials: true }

// //       );

// //       console.log("Backend Response:", result.data);
// //       dispatch(setUserData(result.data))

// //     } catch (error) {
// //       console.log("========== FIREBASE ERROR ==========");
// //       console.log(error);
// //       console.log("Code:", error.code);
// //       console.log("Message:", error.message);
// //       console.log("===================================");
// //     }
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20">
// //       <motion.div
// //         initial={{ opacity: 0, y: -40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 1.05 }}
// //         className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200"
// //       >
// //         <div className="flex items-center justify-center gap-3 mb-6">
// //           <div className="bg-black text-white p-2 rounded-lg">
// //             <BsRobot size={18} />
// //           </div>
// //           <h2 className="text-lg font-semibold">InterViewIQ.AI</h2>
// //         </div>

// //         <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
// //           Continue with{" "}
// //           <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
// //             <IoSparkles size={16} />
// //             AI Smart Interview
// //           </span>
// //         </h1>

// //         <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
// //           Sign in to start AI-powered mock interviews, track your progress,
// //           and unlock detailed performance insights.
// //         </p>

// //         <motion.button
// //           onClick={handleGoogleAuth}
// //           whileHover={{ opacity: 0.9, scale: 1.03 }}
// //           whileTap={{ opacity: 1, scale: 0.95 }}
// //           className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md"
// //         >
// //           <FcGoogle size={20} />
// //           <span>Continue with Google</span>
// //         </motion.button>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default Auth;

// import { BsRobot } from "react-icons/bs";
// import { IoSparkles } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";

// import { motion } from "motion/react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../utils/firebase";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";



// function Auth({ isModel = false }) {
//   const dispatch = useDispatch;
//   const navigate = useNavigate;
//   // const handleGoogleAuth = async () => {
//   //   try {
//   //     const response = await signInWithPopup(auth, provider);

//   //     const user = response.user;

//   //     const name = user.displayName;
//   //     const email = user.email;

//   //     const result = await axios.post(
//   //       serverUrl + "/api/auth/google",
//   //       { name, email },
//   //       { withCredentials: true }
//   //     );

//   //     console.log(result.data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const handleGoogleAuth = async () => {
//     try {
//       const response = await signInWithPopup(auth, provider);

//       const user = response.user;

//       const name = user.displayName;
//       const email = user.email;

//       // Login on backend (creates JWT cookie)
//       await axios.post(
//         serverUrl + "/api/auth/google",
//         { name, email },
//         { withCredentials: true },
//       );

//       // Get latest user from backend
//       const currentUser = await axios.get(
//         serverUrl + "/api/user/current-user",
//         {
//           withCredentials: true,
//         },
//       );

//       // Update Redux
//       dispatch(setUserData(currentUser.data));

//       // Navigate back to home
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className={`${
//         isModel ? "" : "w-full min-h-screen bg-[#f3f3f3]"
//       } flex items-center justify-center px-6 py-20`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200"
//       >
//         <div className="flex items-center justify-center gap-3 mb-6">
//           <div className="bg-black text-white p-2 rounded-lg">
//             <BsRobot size={18} />
//           </div>

//           <h2 className="text-lg font-semibold">InterviewIQ.AI</h2>
//         </div>

//         <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
//           Continue with{" "}
//           <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
//             <IoSparkles size={16} />
//             AI Smart Interview
//           </span>
//         </h1>

//         <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
//           Sign in to start AI-powered mock interviews, track your progress, and
//           unlock detailed performance insights.
//         </p>

//         <motion.button
//           onClick={handleGoogleAuth}
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.96 }}
//           className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full"
//         >
//           <FcGoogle size={22} />
//           Continue with Google
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// export default Auth;




// import { BsRobot } from "react-icons/bs";
// import { IoSparkles } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";
// import { motion } from "motion/react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../utils/firebase";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// function Auth({ isModel = false, onClose }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleGoogleAuth = async () => {
//     try {
//       const response = await signInWithPopup(auth, provider);

//       const user = response.user;

//       await axios.post(
//         serverUrl + "/api/auth/google",
//         {
//           name: user.displayName,
//           email: user.email,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const currentUser = await axios.get(
//         serverUrl + "/api/user/current-user",
//         {
//           withCredentials: true,
//         }
//       );

//       dispatch(setUserData(currentUser.data));

//       // Close modal if opened as popup
//       if (isModel && onClose) {
//         onClose();
//       }

//       // Redirect only when using full page
//       if (!isModel) {
//         navigate("/", { replace: true });
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className={`${
//         isModel ? "" : "w-full min-h-screen bg-[#f3f3f3]"
//       } flex items-center justify-center px-6 py-20`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200"
//       >
//         <div className="flex items-center justify-center gap-3 mb-6">
//           <div className="bg-black text-white p-2 rounded-lg">
//             <BsRobot size={18} />
//           </div>

//           <h2 className="text-lg font-semibold">
//             InterviewIQ.AI
//           </h2>
//         </div>

//         <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
//           Continue with{" "}
//           <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
//             <IoSparkles size={16} />
//             AI Smart Interview
//           </span>
//         </h1>

//         <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
//           Sign in to start AI-powered mock interviews, track your progress,
//           and unlock detailed performance insights.
//         </p>

//         <motion.button
//           onClick={handleGoogleAuth}
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.96 }}
//           className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full"
//         >
//           <FcGoogle size={22} />
//           Continue with Google
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// export default Auth;














import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Auth({ isModel = false, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      await axios.post(
        serverUrl + "/api/auth/google",
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      const currentUser = await axios.get(
        serverUrl + "/api/user/current-user",
        { withCredentials: true }
      );

      dispatch(setUserData(currentUser.data));

      if (isModel && onClose) {
        onClose();
      }

      if (!isModel) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        isModel
          ? "p-0"
          : "w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 px-6 py-20"
      } flex items-center justify-center`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-9 rounded-[2rem] bg-white shadow-2xl shadow-gray-900/10 border border-gray-100"
      >
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-2.5 rounded-2xl shadow-lg shadow-gray-900/10">
            <BsRobot size={18} />
          </div>

          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            InterviewIQ.AI
          </h2>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center leading-snug mb-4 text-gray-900">
          Continue with{" "}
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full inline-flex items-center gap-2 border border-emerald-100">
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>

        <p className="text-gray-500 text-center text-sm leading-relaxed mb-9">
          Sign in to start AI-powered mock interviews, track your progress,
          and unlock detailed performance insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-semibold shadow-lg shadow-gray-900/15 hover:shadow-xl transition-shadow duration-300"
        >
          <FcGoogle size={22} />
          Continue with Google
        </motion.button>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;