// import React from "react";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import { motion } from "motion/react";

// import { BsRobot, BsMic, BsClock } from "react-icons/bs";
// import { HiSparkles } from "react-icons/hi";
// import aiAns from "../assets/ai-ans.png";
// import confi from "../assets/confi.png";
// import credit from "../assets/credit.png";
// import history from "../assets/history.png";
// import HR from "../assets/HR.png";
// import img1 from "../assets/img1.png";
// import MM from "../assets/MM.png";
// import pdf from "../assets/pdf.png";
// import resume from "../assets/resume.png";
// import tech from "../assets/tech.png";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const { userData } = useSelector((state) => state.user);

//   const navigate = useNavigate();

//   const interviewModes = [
//     {
//       title: "HR Interview",
//       description: "Practice HR rounds with realistic AI conversations.",
//       image: HR,
//     },
//     {
//       title: "Technical Interview",
//       description: "Domain-specific technical questions with follow-ups.",
//       image: tech,
//     },
//     {
//       title: "Confidence Detection",
//       description: "Analyze confidence, fluency and speaking style.",
//       image: confi,
//     },
//     {
//       title: "Credit System",
//       description: "Earn and use interview credits seamlessly.",
//       image: credit,
//     },
//   ];

//   const features = [
//     {
//       title: "AI Answer Analysis",
//       description:
//         "Receive instant AI-powered feedback with detailed suggestions to improve every answer.",
//       image: aiAns,
//     },
//     {
//       title: "Confidence Tracking",
//       description:
//         "Analyze confidence, speaking pace, clarity, and communication skills in real time.",
//       image: confi,
//     },
//     {
//       title: "Resume Based Questions",
//       description:
//         "Upload your resume and let InterviewIQ generate personalized technical and HR questions.",
//       image: resume,
//     },
//     {
//       title: "HR Interview Simulation",
//       description:
//         "Practice realistic HR interviews with adaptive AI follow-up questions and evaluation.",
//       image: HR,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* <Navbar /> */}

//       <section className="pt-0 pb-20 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col items-center">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white border border-green-200 shadow-sm text-gray-700 text-sm px-5 py-2 rounded-full flex items-center gap-2"
//           >
//             <HiSparkles className="text-green-500" />
//             AI Powered Smart Interview Platform
//           </motion.div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mt-8 text-center text-5xl md:text-7xl font-extrabold leading-tight text-gray-900"
//           >
//             Practice Interviews with
//             <br />
//             <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
//               AI Intelligence
//             </span>
//           </motion.h1>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mt-6 max-w-3xl text-center text-gray-500 text-lg leading-8"
//           >
//             Role-based mock interviews with smart follow-up questions, adaptive
//             difficulty and real-time AI performance evaluation.
//           </motion.p>

//           {/* Buttons */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="flex gap-5 mt-10 flex-wrap justify-center"
//           >
//             <button
//               onClick={() => navigate("/interview")}
//               className="px-8 py-4 rounded-2xl bg-black text-white font-semibold shadow-xl hover:scale-105 transition"
//             >
//               🚀 Start Interview
//             </button>

//             <button
//              onClick={() => navigate("/history")}
//             className="px-8 py-4 rounded-2xl bg-white border border-gray-300 font-semibold hover:border-green-500 hover:text-green-600 transition">
//               View History
//             </button>
//           </motion.div>

//           {/* Steps */}
//           <div className="grid md:grid-cols-3 gap-8 mt-24 w-full max-w-6xl">
//             {/* Card 1 */}
//             <motion.div
//               whileHover={{ y: -10, rotate: -2 }}
//               className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center rotate-[-5deg]"
//             >
//               <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg border border-green-200 flex items-center justify-center">
//                 <BsRobot className="text-3xl text-green-500" />
//               </div>

//               <p className="text-green-500 text-xs font-bold mt-8">STEP 1</p>

//               <h3 className="mt-3 text-2xl font-bold">Role & Experience</h3>

//               <p className="mt-4 text-gray-500">
//                 AI automatically adjusts the interview according to your
//                 selected role and experience.
//               </p>
//             </motion.div>

//             {/* Card 2 */}
//             <motion.div
//               whileHover={{ y: -10, rotate: 2 }}
//               className="relative bg-white rounded-3xl shadow-xl border-2 border-green-200 p-10 text-center"
//             >
//               <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg border border-green-200 flex items-center justify-center">
//                 <BsMic className="text-3xl text-green-500" />
//               </div>

//               <p className="text-green-500 text-xs font-bold mt-8">STEP 2</p>

//               <h3 className="mt-3 text-2xl font-bold">Smart Voice Interview</h3>

//               <p className="mt-4 text-gray-500">
//                 Dynamic follow-up questions generated from your answers just
//                 like a real interviewer.
//               </p>
//             </motion.div>

//             {/* Card 3 */}
//             <motion.div
//               whileHover={{ y: -10, rotate: 2 }}
//               className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center rotate-[5deg]"
//             >
//               <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg border border-green-200 flex items-center justify-center">
//                 <BsClock className="text-3xl text-green-500" />
//               </div>

//               <p className="text-green-500 text-xs font-bold mt-8">STEP 3</p>

//               <h3 className="mt-3 text-2xl font-bold">Timed Simulation</h3>

//               <p className="mt-4 text-gray-500">
//                 Experience real interview pressure with countdown timer and
//                 instant AI evaluation.
//               </p>
//             </motion.div>
//           </div>
//           <div className="w-full mt-32 mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl md:text-5xl font-bold text-center"
//             >
//               Advanced AI <span className="text-green-600">Capabilities</span>
//             </motion.h2>

//             <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">
//               Experience next-generation interview preparation powered by
//               Artificial Intelligence, voice analysis and personalized feedback.
//             </p>

//             <div className="grid lg:grid-cols-2 gap-10 mt-20">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: index * 0.15 }}
//                   whileHover={{ y: -10 }}
//                   className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center p-8 hover:shadow-2xl transition-all duration-300"
//                 >
//                   <div className="md:w-2/5 flex justify-center">
//                     <img
//                       src={feature.image}
//                       alt={feature.title}
//                       className="w-56 h-56 object-contain transition duration-300 group-hover:scale-105"
//                     />
//                   </div>

//                   <div className="md:w-3/5 mt-8 md:mt-0 md:pl-8 text-center md:text-left">
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {feature.title}
//                     </h3>

//                     <p className="text-gray-500 leading-7 mt-4">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <div className="w-full  mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl md:text-5xl font-bold text-center"
//             >
//               Multiple Interview <span className="text-green-600">Modes</span>
//             </motion.h2>

//             <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">
//               Select the interview mode that matches your preparation and
//               receive intelligent AI feedback after every session.
//             </p>

//             <div className="grid lg:grid-cols-2 gap-8 mt-16">
//               {interviewModes.map((mode, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ y: -8 }}
//                   className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center p-6"
//                 >
//                   {/* Image */}
//                   <div className="w-40 flex justify-center">
//                     <img
//                       src={mode.image}
//                       alt={mode.title}
//                       className="w-28 h-28 object-contain"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 pl-6">
//                     <h3 className="text-xl font-bold text-gray-900">
//                       {mode.title}
//                     </h3>

//                     <p className="text-gray-500 mt-3 leading-6 text-sm">
//                       {mode.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

import { BsRobot, BsMic, BsClock } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import aiAns from "../assets/ai-ans.png";
import confi from "../assets/confi.png";
import credit from "../assets/credit.png";
import HR from "../assets/HR.png";
import resume from "../assets/resume.png";
import tech from "../assets/tech.png";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import AuthModel from "../components/AuthModel";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showAuth, setShowAuth] = useState(false);
  const handleStartInterview = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/interview");
  };

  const handleHistory = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/history");
  };

  const interviewModes = [
    {
      title: "HR Interview",
      description: "Practice HR rounds with realistic AI conversations.",
      image: HR,
    },
    {
      title: "Technical Interview",
      description: "Domain-specific technical questions with follow-ups.",
      image: tech,
    },
    {
      title: "Confidence Detection",
      description: "Analyze confidence, fluency and speaking style.",
      image: confi,
    },
    {
      title: "Credit System",
      description: "Earn and use interview credits seamlessly.",
      image: credit,
    },
  ];

  const features = [
    {
      title: "AI Answer Analysis",
      description:
        "Receive instant AI-powered feedback with detailed suggestions to improve every answer.",
      image: aiAns,
    },
    {
      title: "Confidence Tracking",
      description:
        "Analyze confidence, speaking pace, clarity, and communication skills in real time.",
      image: confi,
    },
    {
      title: "Resume Based Questions",
      description:
        "Upload your resume and let InterviewIQ generate personalized technical and HR questions.",
      image: resume,
    },
    {
      title: "HR Interview Simulation",
      description:
        "Practice realistic HR interviews with adaptive AI follow-up questions and evaluation.",
      image: HR,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-emerald-50/30">
      <section className="pt-12 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-emerald-200/70 shadow-sm shadow-emerald-100 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2"
          >
            <HiSparkles className="text-emerald-500" />
            AI Powered Smart Interview Platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-9 text-center text-5xl md:text-7xl font-extrabold leading-[1.05] text-gray-900 tracking-tight"
          >
            Practice Interviews with
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-7 max-w-2xl text-center text-gray-500 text-lg leading-8"
          >
            Role-based mock interviews with smart follow-up questions, adaptive
            difficulty and real-time AI performance evaluation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mt-11 flex-wrap justify-center"
          >
            <button
              // onClick={() => navigate("/interview")}
              onClick={handleStartInterview}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-black text-white font-semibold shadow-xl shadow-gray-900/15 hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              🚀 Start Interview
            </button>

            <button
              // onClick={() => navigate("/history")}

              onClick={handleHistory}
              className="px-8 py-4 rounded-2xl bg-white border border-gray-200 font-semibold text-gray-700 hover:border-emerald-400 hover:text-emerald-600 hover:shadow-md transition-all duration-300"
            >
              View History
            </button>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mt-28 w-full max-w-6xl">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10, rotate: -2 }}
              className="relative bg-white rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-100 p-10 text-center rotate-[-3deg] transition-shadow hover:shadow-2xl"
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg shadow-emerald-100 border border-emerald-100 flex items-center justify-center">
                <BsRobot className="text-3xl text-emerald-500" />
              </div>

              <p className="text-emerald-500 text-xs font-bold tracking-widest mt-9">
                STEP 1
              </p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                Role & Experience
              </h3>
              <p className="mt-4 text-gray-500 leading-7">
                AI automatically adjusts the interview according to your
                selected role and experience.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -10, rotate: 2 }}
              className="relative bg-white rounded-3xl shadow-xl shadow-emerald-100/60 border-2 border-emerald-200 p-10 text-center transition-shadow hover:shadow-2xl"
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg shadow-emerald-100 border border-emerald-100 flex items-center justify-center">
                <BsMic className="text-3xl text-emerald-500" />
              </div>

              <p className="text-emerald-500 text-xs font-bold tracking-widest mt-9">
                STEP 2
              </p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                Smart Voice Interview
              </h3>
              <p className="mt-4 text-gray-500 leading-7">
                Dynamic follow-up questions generated from your answers just
                like a real interviewer.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10, rotate: 2 }}
              className="relative bg-white rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-100 p-10 text-center rotate-[3deg] transition-shadow hover:shadow-2xl"
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white shadow-lg shadow-emerald-100 border border-emerald-100 flex items-center justify-center">
                <BsClock className="text-3xl text-emerald-500" />
              </div>

              <p className="text-emerald-500 text-xs font-bold tracking-widest mt-9">
                STEP 3
              </p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                Timed Simulation
              </h3>
              <p className="mt-4 text-gray-500 leading-7">
                Experience real interview pressure with countdown timer and
                instant AI evaluation.
              </p>
            </motion.div>
          </div>

          {/* Advanced AI Capabilities */}
          <div className="w-full mt-36 mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-gray-900"
            >
              Advanced AI <span className="text-emerald-600">Capabilities</span>
            </motion.h2>

            <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
              Experience next-generation interview preparation powered by
              Artificial Intelligence, voice analysis and personalized feedback.
            </p>

            <div className="grid lg:grid-cols-2 gap-10 mt-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2rem] shadow-lg shadow-gray-900/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center p-9 hover:shadow-2xl hover:border-emerald-100 transition-all duration-300"
                >
                  <div className="md:w-2/5 flex justify-center">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-52 h-52 object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="md:w-3/5 mt-8 md:mt-0 md:pl-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 leading-7 mt-4">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Modes */}
          <div className="w-full mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-gray-900"
            >
              Multiple Interview <span className="text-emerald-600">Modes</span>
            </motion.h2>

            <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
              Select the interview mode that matches your preparation and
              receive intelligent AI feedback after every session.
            </p>

            <div className="grid lg:grid-cols-2 gap-7 mt-16">
              {interviewModes.map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-md shadow-gray-900/5 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex items-center p-7"
                >
                  <div className="w-32 flex justify-center shrink-0">
                    <img
                      src={mode.image}
                      alt={mode.title}
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  <div className="flex-1 pl-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {mode.title}
                    </h3>
                    <p className="text-gray-500 mt-2.5 leading-6 text-sm">
                      {mode.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* // Fix: Show authentication popup for protected actions */}
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Home;
