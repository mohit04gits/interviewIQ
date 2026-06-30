// import React, { useState } from "react";
// import { motion } from "motion/react";

// import { FaUserTie, FaMicrophoneAlt, FaChartLine } from "react-icons/fa";

// const Step1Setup = ({ onStart }) => {
//   const features = [
//     {
//       icon: <FaUserTie />,
//       title: "Choose Role & Experience",
//       description:
//         "Select your desired job role and experience level to personalize your interview.",
//     },
//     {
//       icon: <FaMicrophoneAlt />,
//       title: "Smart Voice Interview",
//       description:
//         "Practice realistic AI-powered HR and technical interviews with voice interaction.",
//     },
//     {
//       icon: <FaChartLine />,
//       title: "Performance Analytics",
//       description:
//         "Receive detailed reports, scores and personalized improvement suggestions.",
//     },
//   ];

//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [mode, setMode] = useState("technical");

//   const [resumeFile, setResumeFile] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const [projects, setProjects] = useState([]);

//   const [skills, setSkills] = useState([]);

//   const [resumeText, setResumeText] = useState("");

//   const [analysisDone, setAnalysisDone] = useState(false);

//   const [analyzing, setAnalyzing] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10"
//     >
//       <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl grid md:grid-cols-2 overflow-hidden">
//         {/* Left Section */}
//         <motion.div
//           initial={{ x: -40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center"
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm">
//             <FaUserTie className="text-green-600 text-lg" />
//             <span className="text-green-700 text-sm font-semibold">
//               AI Powered Interview
//             </span>
//           </div>

//           {/* Heading */}
//           <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900">
//             Start Your
//             <br />
//             <span className="text-green-600">AI Interview</span>
//           </h1>

//           {/* Description */}
//           <p className="mt-6 text-gray-600 leading-7 max-w-md">
//             Experience realistic AI-powered mock interviews tailored to your
//             role, improve your confidence and receive instant personalized
//             feedback.
//           </p>

//           {/* Features */}
//           <div className="mt-10 space-y-5">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.15 }}
//                 whileHover={{
//                   x: 6,
//                   scale: 1.02,
//                 }}
//                 className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-5 cursor-pointer"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
//                   <span className="text-2xl text-green-600">
//                     {feature.icon}
//                   </span>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {feature.title}
//                   </h3>

//                   <p className="text-sm text-gray-500 mt-1 leading-6">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Right Section */}
//         {/* Right Section */}
//         <motion.div
//           initial={{ x: 40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="p-12 flex items-center justify-center"
//         >
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Interview Setup
//             </h2>

//             <p className="text-gray-500 mt-2 mb-8">
//               Configure your interview preferences before you begin.
//             </p>

//             <div className="space-y-6">
//               {/* Role */}
//               <div className="relative">
//                 <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//                 <input
//                   onChange={(e) => setRole(e.target.value)}
//                   value={role}
//                   type="text"
//                   placeholder="Target Role (Frontend Developer)"
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
//                 />
//               </div>

//               {/* Experience */}
//               <div className="relative">
//                 <FaChartLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//                 <input
//                   onChange={(e) => setExperience(e.target.value)}
//                   value={experience}
//                   type="number"
//                   placeholder="Years of Experience"
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
//                 />
//               </div>

//               {/* Interview Type */}
//               <div className="relative">
//                 <FaMicrophoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//                 <select
//                   value={mode}
//                   onChange={(e) => setMode(e.target.value)}
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
//                 >
//                   <option>Technical Interview</option>
//                   <option>HR Interview</option>
//                 </select>
//               </div>

//               {/* Resume Upload */}
//               {!analysisDone && (
//                 <motion.div
//                 whileHover={{scale:1.02}}
//                 onClick={()=>document.getElementById("resumeUpload").click()}
//                 >
//                   <label className="block text-sm font-medium text-gray-600 mb-2">
//                     Upload Resume (Optional)
//                   </label>

//                   <input
//                     onChange={(e) => setResumeFile(e.target.files[0])}
//                     type="file"
//                     id="resumeUpload"
//                     accept=".pdf"
//                     className="w-full border border-dashed border-green-300 rounded-xl p-4 text-gray-500 file:bg-green-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-green-700 file:font-medium cursor-pointer"
//                   />
//                   <p>
//                     {resumeFile ? resumeFile.name: "Click to upload resume(Optional)"}
//                   </p>

//                   {resumeFile && (
//                     <motion.button
//                     whileHover={{scale:1.02}}
//                     className="mt-4 bg-gray-900 text-white px-5 py-2 hover:bg-gray-800 transition">
//                     {analyzing ? "Analyzing.....":"Analyze Resume"}
//                     </motion.button>
//                   )}
//                 </motion.div>
//               )}

//               {/* Button */}
//               <button
//                 onClick={onStart}
//                 className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 Start Interview →
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Step1Setup;

// import React, { useState } from "react";
// import { motion } from "motion/react";
// import axios from "axios";
// import {
//   FaUserTie,
//   FaMicrophoneAlt,
//   FaChartLine,
//   FaFilePdf,
// } from "react-icons/fa";
// import { serverUrl } from "../App";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// const Step1Setup = ({ onStart }) => {
//   const features = [
//     {
//       icon: <FaUserTie />,
//       title: "Choose Role & Experience",
//       description:
//         "Select your desired job role and experience level to personalize your interview.",
//     },
//     {
//       icon: <FaMicrophoneAlt />,
//       title: "Smart Voice Interview",
//       description:
//         "Practice realistic AI-powered HR and technical interviews with voice interaction.",
//     },
//     {
//       icon: <FaChartLine />,
//       title: "Performance Analytics",
//       description:
//         "Receive detailed reports, scores and personalized improvement suggestions.",
//     },
//   ];

//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [mode, setMode] = useState("technical");

//   const [resumeFile, setResumeFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [resumeText, setResumeText] = useState("");
//   const [analysisDone, setAnalysisDone] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);

//   const { userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleUploadResume = async () => {
//     try {
//       if (!resumeFile) return;

//       setAnalyzing(true);

//       const formData = new FormData();
//       formData.append("resume", resumeFile);

//       const { data } = await axios.post(
//         serverUrl + "/api/interview/resume",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log(data);

//       setProjects(data.projects || []);
//       setSkills(data.skills || []);
//       setResumeText(data.resumeText || "");

//       setRole((prev) => prev || data.role || "");
//       setExperience((prev) => prev || data.experience || "");

//       setAnalysisDone(true);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const handleStart = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post(
//         serverUrl + "/api/interview/generate-questions",
//         {
//           role,
//           experience,
//           mode,
//           resumeText,
//           projects,
//           skills,
//         },
//         { withCredentials: true },
//       );
//       console.log(result.data);

//       if (userData) {
//         dispatch(
//           setUserData({ ...userData, credits: result.data.creditsLeft }),
//         );
//       }

//       setLoading(false);
//       onStart(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen flex items-center justify-center bg-white px-4 py-6"
//     >
//       <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl grid md:grid-cols-2 overflow-hidden">
//         {/* LEFT */}
//         <motion.div
//           initial={{ x: -40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center"
//         >
//           <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm">
//             <FaUserTie className="text-green-600" />
//             <span className="text-green-700 font-semibold text-sm">
//               AI Powered Interview
//             </span>
//           </div>

//           <h1 className="mt-8 text-5xl font-bold leading-tight">
//             Start Your
//             <br />
//             <span className="text-green-600">AI Interview</span>
//           </h1>

//           <p className="mt-6 text-gray-600 leading-7 max-w-md">
//             Experience realistic AI-powered mock interviews tailored to your
//             role, improve your confidence and receive instant personalized
//             feedback.
//           </p>

//           <div className="mt-10 space-y-5">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.15 }}
//                 whileHover={{
//                   x: 8,
//                   scale: 1.02,
//                 }}
//                 className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-5"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
//                   <span className="text-green-600 text-2xl">
//                     {feature.icon}
//                   </span>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-lg">{feature.title}</h3>

//                   <p className="text-gray-500 text-sm mt-1">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* RIGHT */}
//         <motion.div
//           initial={{ x: 40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="p-12 flex items-center justify-center"
//         >
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold">Interview Setup</h2>

//             <p className="text-gray-500 mt-2 mb-8">
//               Configure your interview before starting.
//             </p>

//             <div className="space-y-6">
//               {/* Role */}
//               <div className="relative">
//                 <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   type="text"
//                   placeholder="Frontend Developer"
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
//                 />
//               </div>

//               {/* Experience */}
//               <div className="relative">
//                 <FaChartLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   value={experience}
//                   onChange={(e) => setExperience(e.target.value)}
//                   type="number"
//                   placeholder="Experience (Eg. 2)"
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
//                 />
//               </div>

//               {/* Mode */}
//               <div className="relative">
//                 <FaMicrophoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <select
//                   value={mode}
//                   onChange={(e) => setMode(e.target.value)}
//                   className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
//                 >
//                   <option value="technical">Technical Interview</option>

//                   <option value="hr">HR Interview</option>

//                   <option value="mixed">Mixed Interview</option>
//                 </select>
//               </div>
//               {/* Resume Upload */}
//               {!analysisDone && (
//                 <div className="space-y-4">
//                   <label className="block text-sm font-medium text-gray-600">
//                     Upload Resume (Optional)
//                   </label>

//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() =>
//                       document.getElementById("resumeUpload").click()
//                     }
//                     className="border-2 border-dashed border-green-300 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 py-8 cursor-pointer flex flex-col items-center justify-center"
//                   >
//                     <FaFilePdf className="text-5xl text-red-500 mb-4" />

//                     <h4 className="font-semibold text-gray-800">
//                       {resumeFile ? resumeFile.name : "Click to Upload Resume"}
//                     </h4>

//                     <p className="text-sm text-gray-500 mt-1">PDF files only</p>

//                     <input
//                       id="resumeUpload"
//                       type="file"
//                       accept=".pdf"
//                       className="hidden"
//                       onChange={(e) => setResumeFile(e.target.files[0])}
//                     />
//                   </motion.div>

//                   {resumeFile && (
//                     <motion.button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleUploadResume();
//                       }}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       disabled={analyzing}
//                       className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition"
//                     >
//                       {analyzing ? "Analyzing Resume..." : "Analyze Resume"}
//                     </motion.button>
//                   )}
//                 </div>
//               )}

//               {analysisDone && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-gray-50 border-gray-200 rounded-xl p-5 space-y-4"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Resume Analysis Result
//                   </h3>
//                 </motion.div>
//               )}

//               {/* Resume Analysis Result */}
//               {/* {analysisDone && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="rounded-2xl border border-green-200 bg-green-50 p-5"
//                 >
//                   <h3 className="font-semibold text-green-700">
//                     ✓ Resume Analyzed Successfully
//                   </h3>

//                   <div className="mt-4 space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Skills</span>

//                       <span className="font-semibold">{skills.length}</span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Projects</span>

//                       <span className="font-semibold">{projects.length}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )} */}

//               {/* Resume Analysis Result */}
//               {/* {analysisDone && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5 shadow-md"
//                 >
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
//                       <FaChartLine className="text-green-600 text-xl" />
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         Resume Analysis Result
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         AI extracted the following information.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-2">Skills</p>

//                       <div className="flex flex-wrap gap-2">
//                         {skills.length ? (
//                           skills.map((skill, index) => (
//                             <span
//                               key={index}
//                               className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
//                             >
//                               {skill}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-gray-400 text-sm">
//                             No skills detected
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <p className="text-sm text-gray-500 mb-2">Projects</p>

//                       {projects.length ? (
//                         <ul className="space-y-2">
//                           {projects.map((project, index) => (
//                             <li
//                               key={index}
//                               className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
//                             >
//                               {project}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <span className="text-gray-400 text-sm">
//                           No projects detected
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               )} */}

//               {/* Resume Analysis Result */}
//               {analysisDone && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5 shadow-md"
//                 >
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
//                       <FaChartLine className="text-green-600 text-xl" />
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         Resume Analysis Result
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         AI extracted information from your resume.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-5">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-2">
//                         Skills
//                       </p>

//                       <div className="flex flex-wrap gap-2">
//                         {skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-gray-500 mb-2">
//                         Projects
//                       </p>

//                       <div className="space-y-2">
//                         {projects.map((project, index) => (
//                           <div
//                             key={index}
//                             className="bg-white border rounded-lg px-3 py-2 text-sm"
//                           >
//                             {project}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Start Interview */}
//               <motion.button
//                 whileHover={{
//                   scale: role && experience ? 1.03 : 1,
//                 }}
//                 whileTap={{
//                   scale: role && experience ? 0.97 : 1,
//                 }}
//                 disabled={!role || !experience || loading}
//                 onClick={handleStart}
//                 className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
//                   role && experience
//                     ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 {loading ? "Starting Interview..." : "Start Interview"}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Step1Setup;


























import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import {
  FaUserTie,
  FaMicrophoneAlt,
  FaChartLine,
  FaFilePdf,
} from "react-icons/fa";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Step1Setup = ({ onStart }) => {
  const features = [
    {
      icon: <FaUserTie />,
      title: "Choose Role & Experience",
      description:
        "Select your desired job role and experience level to personalize your interview.",
    },
    {
      icon: <FaMicrophoneAlt />,
      title: "Smart Voice Interview",
      description:
        "Practice realistic AI-powered HR and technical interviews with voice interaction.",
    },
    {
      icon: <FaChartLine />,
      title: "Performance Analytics",
      description:
        "Receive detailed reports, scores and personalized improvement suggestions.",
    },
  ];

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("technical");

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUploadResume = async () => {
    try {
      if (!resumeFile) return;

      setAnalyzing(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const { data } = await axios.post(
        serverUrl + "/api/interview/resume",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(data);

      setProjects(data.projects || []);
      setSkills(data.skills || []);
      setResumeText(data.resumeText || "");

      setRole((prev) => prev || data.role || "");
      setExperience((prev) => prev || data.experience || "");

      setAnalysisDone(true);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/interview/generate-questions",
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true },
      );
      console.log(result.data);

      if (userData) {
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 px-4 py-8"
    >
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-gray-900/10 border border-gray-100 grid md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-10 md:p-12 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm">
            <FaUserTie className="text-emerald-600" size={13} />
            <span className="text-emerald-700 font-semibold text-sm">
              AI Powered Interview
            </span>
          </div>

          <h1 className="mt-8 text-4xl md:text-5xl font-bold leading-tight text-gray-900 tracking-tight">
            Start Your
            <br />
            <span className="text-emerald-600">AI Interview</span>
          </h1>

          <p className="mt-6 text-gray-600 leading-7 max-w-md">
            Experience realistic AI-powered mock interviews tailored to your
            role, improve your confidence and receive instant personalized
            feedback.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-5"
              >
                <div className="w-13 h-13 w-[52px] h-[52px] shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-xl">
                    {feature.icon}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-12 flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Interview Setup
            </h2>
            <p className="text-gray-500 mt-2 mb-7">
              Configure your interview before starting.
            </p>

            <div className="space-y-5">
              {/* Role */}
              <div className="relative">
                <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  type="text"
                  placeholder="Frontend Developer"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-shadow"
                />
              </div>

              {/* Experience */}
              <div className="relative">
                <FaChartLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  type="number"
                  placeholder="Experience (Eg. 2)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-shadow"
                />
              </div>

              {/* Mode */}
              <div className="relative">
                <FaMicrophoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none appearance-none bg-white transition-shadow"
                >
                  <option value="technical">Technical Interview</option>
                  <option value="hr">HR Interview</option>
                  <option value="mixed">Mixed Interview</option>
                </select>
              </div>

              {/* Resume Upload */}
              {!analysisDone && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-600">
                    Upload Resume (Optional)
                  </label>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() =>
                      document.getElementById("resumeUpload").click()
                    }
                    className="border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 py-8 cursor-pointer flex flex-col items-center justify-center"
                  >
                    <FaFilePdf className="text-4xl text-red-400 mb-3" />
                    <h4 className="font-semibold text-gray-800">
                      {resumeFile ? resumeFile.name : "Click to Upload Resume"}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">PDF files only</p>
                    <input
                      id="resumeUpload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                  </motion.div>

                  {resumeFile && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadResume();
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={analyzing}
                      className="w-full bg-gradient-to-r from-gray-900 to-black hover:shadow-lg text-white py-3 rounded-2xl font-semibold shadow-md shadow-gray-900/10 transition-all disabled:opacity-70"
                    >
                      {analyzing ? "Analyzing Resume..." : "Analyze Resume"}
                    </motion.button>
                  )}
                </div>
              )}

              {/* Resume Analysis Result */}
              {analysisDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <FaChartLine className="text-emerald-600" size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Resume Analysis Result
                      </h3>
                      <p className="text-xs text-gray-400">
                        AI extracted information from your resume.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Projects
                      </p>
                      <div className="space-y-2">
                        {projects.map((project, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-sm text-gray-700"
                          >
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Start Interview */}
              <motion.button
                whileHover={{ scale: role && experience ? 1.02 : 1 }}
                whileTap={{ scale: role && experience ? 0.97 : 1 }}
                disabled={!role || !experience || loading}
                onClick={handleStart}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  role && experience
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-xl text-white shadow-lg shadow-emerald-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Starting Interview..." : "Start Interview"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1Setup;