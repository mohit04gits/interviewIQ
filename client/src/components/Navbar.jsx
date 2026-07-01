// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";
// import { BsCoin, BsRobot } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";
// import AuthModel from "./AuthModel";

// function Navbar() {
//   const { userData } = useSelector((state) => state.user);

//   const [showCreditPopup, setShowCreditPopup] = useState(false);
//   const [showUserPopup, setShowUserPopup] = useState(false);

//   const [showAuth, setShowAuth] = useState(false);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   //Logout
//   const handleLogout = async () => {
//     try {
//       // Remove JWT cookie
//       await axios.get(serverUrl + "/api/auth/logout", {
//         withCredentials: true,
//       });

//       // Clear Redux state
//       dispatch(setUserData(null));

//       // Close popups
//       setShowCreditPopup(false);
//       setShowUserPopup(false);

//       // Redirect
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
// <div className="sticky top-0 z-50 bg-white flex justify-center px-6 py-3 border-b border-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-4 flex items-center justify-between"
//       >
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="bg-black p-2 rounded-xl">
//             <BsRobot className="text-white text-xl" />
//           </div>

//           <div>
//             <h1 
//             onClick={()=>navigate("/")}
//             className="text-xl cursor-pointer font-bold text-gray-800">InterviewIQ</h1>
//             <p className="text-xs text-gray-500">AI Mock Interview</p>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {/* Credits Button */}
//           {/* <button
//             onClick={() => {
//               setShowCreditPopup(!showCreditPopup);
//             }}
//             className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm
//     transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
//           >
//             <BsCoin size={20} />
//             {userData?.credits || 0}
//           </button> */}

//           <div className="relative">
//             <button
//               onClick={() => {
//                 if (!userData) {
//                   setShowAuth(true);
//                   return;
//                 }
//                 setShowCreditPopup(!showCreditPopup);
//                 setShowUserPopup(false);
//               }}
//               className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm
//     transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
//             >
//               <BsCoin size={20} />
//               {userData?.credits || 0}
//             </button>

//             {showCreditPopup && (
//               <div className="absolute top-full mt-3 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Need More Credits?
//                 </h3>

//                 <p className="text-sm text-gray-500 mt-2 leading-6">
//                   You're running low on interview credits. Purchase more credits
//                   to continue practicing AI-powered mock interviews.
//                 </p>

//                 <button
//                   onClick={() => navigate("/pricing")}
//                   className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-medium
//         transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02]
//         active:scale-95"
//                 >
//                   Buy More Credits
//                 </button>
//               </div>
//             )}
//           </div>
//           {/* User */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 if (!userData) {
//                   setShowAuth(true);
//                   return;
//                 }
//                 setShowUserPopup(!showUserPopup);
//                 setShowCreditPopup(false);
//               }}
//               className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-full
//     shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-500"
//             >
//               {/* Avatar */}
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg">
//                 {userData?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//             </button>

//             {showUserPopup && (
//               <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
//                 <div className="flex items-center gap-3 border-b pb-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xl">
//                     {userData?.name?.charAt(0).toUpperCase() || "U"}
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       {userData?.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">{userData?.email}</p>
//                   </div>
//                 </div>

//                 <button className="w-full mt-4 text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
//                   👤 Profile
//                 </button>

//                 <button className="w-full mt-2 text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
//                   ⚙️ Settings
//                 </button>

//                 <button
//                   onClick={() => {
//                     handleLogout();
//                   }}
//                   className="w-full mt-2 text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//       {showAuth && (
//         <AuthModel
//           onClose={() => {
//             setShowAuth(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Navbar;




import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsCoin, BsRobot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  //BUY CREDIT FUNCTION
//   const handleBuyCredits = async () => {
//   try {
//     const { data } = await axios.post(
//       `${serverUrl}/api/payment/create-order`,
//       {
//         amount: 99,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: data.order.amount,
//       currency: data.order.currency,
//       name: "InterviewIQ",
//       description: "Interview Credits",
//       order_id: data.order.id,

//       handler: function (response) {
//         console.log(response);
//         alert("Payment Successful");
//       },

//       theme: {
//         color: "#10B981",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   } catch (error) {
//     console.error(error);
//   }
// };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl flex justify-center px-4 sm:px-6 py-3 border-b border-gray-100/80">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-2xl shadow-lg shadow-gray-900/10">
            <BsRobot className="text-white text-lg" />
          </div>

          <div>
            <h1
              onClick={() => navigate("/")}
              className="text-lg sm:text-xl cursor-pointer font-bold text-gray-900 tracking-tight hover:text-emerald-600 transition-colors"
            >
              InterviewIQ
            </h1>
            <p className="text-[11px] text-gray-400 font-medium tracking-wide -mt-0.5">
              AI MOCK INTERVIEW
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Credits Button */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-2xl font-bold text-sm
                border border-emerald-100
                transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 active:scale-95"
            >
              <BsCoin size={16} />
              {userData?.credits || 0}
            </button>

            {showCreditPopup && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 right-0 w-72 bg-white rounded-3xl shadow-2xl shadow-gray-900/10 border border-gray-100 p-6 z-50"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  Need More Credits?
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  You're running low on interview credits. Purchase more
                  credits to continue practicing AI-powered mock interviews.
                </p>

                <button
                   onClick={() => navigate("/pricing")}
                  // onClick={handleBuyCredits}
                  className="w-full mt-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-2xl font-semibold
                    transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200 hover:scale-[1.02]
                    active:scale-95"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="flex items-center gap-3 bg-white border border-gray-200 p-1 rounded-full
                shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-emerald-300"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-base shadow-inner">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </button>

            {showUserPopup && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 right-0 w-64 bg-white rounded-3xl shadow-2xl shadow-gray-900/10 border border-gray-100 p-5 z-50"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-inner">
                    {userData?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {userData?.name}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{userData?.email}</p>
                  </div>
                </div>

                <button className="w-full mt-3 text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  👤 Profile
                </button>

                <button className="w-full mt-1 text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  ⚙️ Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full mt-1 text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  🚪 Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      {showAuth && (
        <AuthModel
          onClose={() => {
            setShowAuth(false);
          }}
        />
      )}
    </div>
  );
}

export default Navbar;