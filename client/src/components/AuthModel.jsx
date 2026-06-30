// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { FaTimes } from "react-icons/fa";
// import Auth from '../pages/Auth';

// function AuthModel({onClose}) {
//   const {userData} = useSelector((state)=>state.user)

//  useEffect(()=>{
//   if(userData){
//     onClose()
//   }
//  },[userData,onClose])

//   return (
//     <div className='fixed flex inset-0 z-[999] items-center justify-center bg-black/10 backdrop-blur-sm px-4'>
//       <div className='relative w-full max-w-md'>
//         <button
        
//         onClick={onClose} className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl'>
//         <FaTimes size={18} />

//         </button>
//         <Auth isModel= {true}/>

//       </div>
//     </div>
//   )
// }

// export default AuthModel

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { FaTimes } from "react-icons/fa";
// import Auth from "../pages/Auth";

// function AuthModel({ onClose }) {
//   const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//     console.log("UserData in Modal:", userData);
//     if (userData) {
//       onClose();
//     }
//   }, [userData, onClose]);

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
//       <div className="relative">

//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-gray-100 shadow"
//         >
//           <FaTimes />
//         </button>

//         <Auth isModel={true} />

//       </div>
//     </div>
//   );
// }

// export default AuthModel;



// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { FaTimes } from "react-icons/fa";
// import Auth from "../pages/Auth";

// function AuthModel({ onClose }) {
//   const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (userData) {
//       onClose();
//     }
//   }, [userData, onClose]);

//   return (
//     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
//       <div className="relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-gray-100 shadow"
//         >
//           <FaTimes />
//         </button>

//         <Auth isModel={true} onClose={onClose} />
//       </div>
//     </div>
//   );
// }

// export default AuthModel;


















import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import Auth from "../pages/Auth";

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-gray-900/60 backdrop-blur-md overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-lg border border-gray-100 transition-colors"
            >
              <FaTimes size={14} />
            </button>

            <Auth isModel={true} onClose={onClose} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default AuthModel;