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
  //Logout
  const handleLogout = async () => {
    try {
      // Remove JWT cookie
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      // Clear Redux state
      dispatch(setUserData(null));

      // Close popups
      setShowCreditPopup(false);
      setShowUserPopup(false);

      // Redirect
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className="sticky top-0 z-50 bg-white flex justify-center px-6 py-3 border-b border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-xl">
            <BsRobot className="text-white text-xl" />
          </div>

          <div>
            <h1 
            onClick={()=>navigate("/")}
            className="text-xl cursor-pointer font-bold text-gray-800">InterviewIQ</h1>
            <p className="text-xs text-gray-500">AI Mock Interview</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Credits Button */}
          {/* <button
            onClick={() => {
              setShowCreditPopup(!showCreditPopup);
            }}
            className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm
    transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <BsCoin size={20} />
            {userData?.credits || 0}
          </button> */}

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
              className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm
    transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <BsCoin size={20} />
              {userData?.credits || 0}
            </button>

            {showCreditPopup && (
              <div className="absolute top-full mt-3 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Need More Credits?
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  You're running low on interview credits. Purchase more credits
                  to continue practicing AI-powered mock interviews.
                </p>

                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-medium
        transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02]
        active:scale-95"
                >
                  Buy More Credits
                </button>
              </div>
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
              className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-full
    shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-500"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </button>

            {showUserPopup && (
              <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xl">
                    {userData?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {userData?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{userData?.email}</p>
                  </div>
                </div>

                <button className="w-full mt-4 text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  👤 Profile
                </button>

                <button className="w-full mt-2 text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  ⚙️ Settings
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full mt-2 text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  🚪 Logout
                </button>
              </div>
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
