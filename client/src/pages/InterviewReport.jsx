
// function InterviewReport() {
//   return (
//     <div>InterviewReport</div>
//   )
// }

// export default InterviewReport



// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "motion/react";
// import {
//   FaTrophy,
//   FaBrain,
//   FaComments,
//   FaCheckCircle,
//   FaRedo,
//   FaHome,
// } from "react-icons/fa";

// function InterviewReport() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const report = location.state?.report;

//   // Agar direct URL pe aaye bina data ke
//   if (!report) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-700">No Report Found</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-xl"
//           >
//             Go Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const {
//     finalScore = 0,
//     confidence = 0,
//     communication = 0,
//     correctness = 0,
//     questionWiseScore = [],
//   } = report;

//   const getScoreColor = (score) => {
//     if (score >= 7) return "text-green-600";
//     if (score >= 4) return "text-yellow-500";
//     return "text-red-500";
//   };

//   const getScoreBg = (score) => {
//     if (score >= 7) return "bg-green-100";
//     if (score >= 4) return "bg-yellow-100";
//     return "bg-red-100";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 8) return "Excellent";
//     if (score >= 6) return "Good";
//     if (score >= 4) return "Average";
//     return "Needs Improvement";
//   };

//   const getBarColor = (score) => {
//     if (score >= 7) return "bg-green-500";
//     if (score >= 4) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 py-10 px-4">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
//             <FaTrophy className="text-3xl text-emerald-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Interview Complete!</h1>
//           <p className="text-gray-500 mt-2">Here's your detailed performance report</p>
//         </motion.div>

//         {/* Final Score */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-3xl shadow-xl p-8 text-center"
//         >
//           <p className="text-gray-500 font-medium mb-2">Overall Score</p>
//           <div className={`text-7xl font-bold ${getScoreColor(finalScore)}`}>
//             {finalScore}
//             <span className="text-3xl text-gray-400">/10</span>
//           </div>
//           <span className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-semibold ${getScoreBg(finalScore)} ${getScoreColor(finalScore)}`}>
//             {getScoreLabel(finalScore)}
//           </span>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-3 gap-4"
//         >
//           {[
//             { label: "Confidence", value: confidence, icon: <FaBrain /> },
//             { label: "Communication", value: communication, icon: <FaComments /> },
//             { label: "Correctness", value: correctness, icon: <FaCheckCircle /> },
//           ].map((stat, i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-md p-5 text-center">
//               <div className="text-2xl text-emerald-500 flex justify-center mb-2">
//                 {stat.icon}
//               </div>
//               <div className={`text-3xl font-bold ${getScoreColor(stat.value)}`}>
//                 {stat.value}
//               </div>
//               <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
//               <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(stat.value / 10) * 100}%` }}
//                   transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
//                   className={`h-full rounded-full ${getBarColor(stat.value)}`}
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Question Wise Breakdown */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-3xl shadow-xl p-6"
//         >
//           <h2 className="text-xl font-bold text-gray-800 mb-5">
//             Question-wise Breakdown
//           </h2>
//           <div className="space-y-4">
//             {questionWiseScore.map((q, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//                 className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
//                       Question {index + 1}
//                     </span>
//                     <p className="mt-1 text-gray-800 font-medium">{q.question}</p>
//                   </div>
//                   <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${getScoreBg(q.score)} ${getScoreColor(q.score)}`}>
//                     {q.score}/10
//                   </div>
//                 </div>

//                 {q.feedback && (
//                   <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
//                     <p className="text-sm text-gray-600">
//                       <span className="font-semibold text-gray-700">Feedback: </span>
//                       {q.feedback}
//                     </p>
//                   </div>
//                 )}

//                 <div className="mt-3 flex gap-3 flex-wrap">
//                   {[
//                     { label: "Confidence", value: q.confidence },
//                     { label: "Communication", value: q.communication },
//                     { label: "Correctness", value: q.correctness },
//                   ].map((s, i) => (
//                     <span
//                       key={i}
//                       className={`text-xs px-3 py-1 rounded-full font-medium ${getScoreBg(s.value)} ${getScoreColor(s.value)}`}
//                     >
//                       {s.label}: {s.value}/10
//                     </span>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Buttons */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="flex gap-4 pb-10"
//         >
//           <button
//             onClick={() => navigate("/")}
//             className="flex-1 h-14 rounded-2xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2"
//           >
//             <FaHome /> Go Home
//           </button>
//           <button
//             onClick={() => navigate("/interview")}
//             className="flex-1 h-14 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
//           >
//             <FaRedo /> Try Again
//           </button>
//         </motion.div>

//       </div>
//     </div>
//   );
// }

// export default InterviewReport;


//......................................................................



// import React, { useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "motion/react";
// import {
//   FaTrophy,
//   FaBrain,
//   FaComments,
//   FaCheckCircle,
//   FaRedo,
//   FaHome,
//   FaDownload,
// } from "react-icons/fa";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas-pro";

// function InterviewReport() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const reportRef = useRef();

//   const report = location.state?.report;

//   if (!report) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-700">No Report Found</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-xl"
//           >
//             Go Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const {
//     finalScore = 0,
//     confidence = 0,
//     communication = 0,
//     correctness = 0,
//     questionWiseScore = [],
//   } = report;

//   const getScoreColor = (score) => {
//     if (score >= 7) return "text-green-600";
//     if (score >= 4) return "text-yellow-500";
//     return "text-red-500";
//   };

//   const getScoreBg = (score) => {
//     if (score >= 7) return "bg-green-100";
//     if (score >= 4) return "bg-yellow-100";
//     return "bg-red-100";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 8) return "Excellent";
//     if (score >= 6) return "Good";
//     if (score >= 4) return "Average";
//     return "Needs Improvement";
//   };

//   const getBarColor = (score) => {
//     if (score >= 7) return "bg-green-500";
//     if (score >= 4) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   // ✅ PDF Download
//   // const handleDownloadPDF = () => {
//   //   import("html2pdf.js").then((html2pdf) => {
//   //     const opt = {
//   //       margin: 0.5,
//   //       filename: `InterviewIQ_Report_${Date.now()}.pdf`,
//   //       image: { type: "jpeg", quality: 0.98 },
//   //       html2canvas: { scale: 2, useCORS: true },
//   //       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//   //     };
//   //     html2pdf.default().set(opt).from(reportRef.current).save();
//   //   });
//   // };


// // const handleDownloadPDF = async () => {
// //     if (!reportRef.current) {
// //       console.error("Report element not found");
// //       return;
// //     }

// //     try {
// //       // Safely capture the DOM with Tailwind v4 / oklch support
// //       const canvas = await html2canvas(reportRef.current, {
// //         scale: 2,
// //         useCORS: true,
// //         logging: false,
// //         backgroundColor: "#ffffff",
// //       });

// //       const imgData = canvas.toDataURL("image/jpeg", 1.0);

// //       const pdf = new jsPDF("p", "mm", "a4");
// //       const pdfWidth = pdf.internal.pageSize.getWidth();
// //       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

// //       pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
// //       pdf.save(`InterviewIQ_Report_${Date.now()}.pdf`);
// //     } catch (err) {
// //       console.error("PDF Generation Error:", err);
// //     }
// //   };


// const handleDownloadPDF = async () => {
//     if (!reportRef.current) {
//       console.error("Report element not found");
//       return;
//     }

//     try {
//       const canvas = await html2canvas(reportRef.current, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#ffffff",
//         // Force the canvas to account for your current scroll position
//         scrollX: 0,
//         scrollY: -window.scrollY,
//         windowWidth: document.documentElement.offsetWidth,
//       });

//       const imgData = canvas.toDataURL("image/jpeg", 1.0);

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`InterviewIQ_Report_${Date.now()}.pdf`);
//     } catch (err) {
//       console.error("PDF Generation Error:", err);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 py-10 px-4">

//       {/* ✅ ref yahan lagaya — sirf report content PDF mein aayega */}
//       <div ref={reportRef} className="max-w-4xl mx-auto space-y-6">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
//             <FaTrophy className="text-3xl text-emerald-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Interview Complete!</h1>
//           <p className="text-gray-500 mt-2">Here's your detailed performance report</p>
//         </motion.div>

//         {/* Final Score */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-3xl shadow-xl p-8 text-center"
//         >
//           <p className="text-gray-500 font-medium mb-2">Overall Score</p>
//           <div className={`text-7xl font-bold ${getScoreColor(finalScore)}`}>
//             {finalScore}
//             <span className="text-3xl text-gray-400">/10</span>
//           </div>
//           <span className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-semibold ${getScoreBg(finalScore)} ${getScoreColor(finalScore)}`}>
//             {getScoreLabel(finalScore)}
//           </span>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-3 gap-4"
//         >
//           {[
//             { label: "Confidence", value: confidence, icon: <FaBrain /> },
//             { label: "Communication", value: communication, icon: <FaComments /> },
//             { label: "Correctness", value: correctness, icon: <FaCheckCircle /> },
//           ].map((stat, i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-md p-5 text-center">
//               <div className="text-2xl text-emerald-500 flex justify-center mb-2">
//                 {stat.icon}
//               </div>
//               <div className={`text-3xl font-bold ${getScoreColor(stat.value)}`}>
//                 {stat.value}
//               </div>
//               <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
//               <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(stat.value / 10) * 100}%` }}
//                   transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
//                   className={`h-full rounded-full ${getBarColor(stat.value)}`}
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* Question Wise Breakdown */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-3xl shadow-xl p-6"
//         >
//           <h2 className="text-xl font-bold text-gray-800 mb-5">
//             Question-wise Breakdown
//           </h2>
//           <div className="space-y-4">
//             {questionWiseScore.map((q, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//                 className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
//                       Question {index + 1}
//                     </span>
//                     <p className="mt-1 text-gray-800 font-medium">{q.question}</p>
//                   </div>
//                   <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${getScoreBg(q.score)} ${getScoreColor(q.score)}`}>
//                     {q.score}/10
//                   </div>
//                 </div>

//                 {q.feedback && (
//                   <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
//                     <p className="text-sm text-gray-600">
//                       <span className="font-semibold text-gray-700">Feedback: </span>
//                       {q.feedback}
//                     </p>
//                   </div>
//                 )}

//                 <div className="mt-3 flex gap-3 flex-wrap">
//                   {[
//                     { label: "Confidence", value: q.confidence },
//                     { label: "Communication", value: q.communication },
//                     { label: "Correctness", value: q.correctness },
//                   ].map((s, i) => (
//                     <span
//                       key={i}
//                       className={`text-xs px-3 py-1 rounded-full font-medium ${getScoreBg(s.value)} ${getScoreColor(s.value)}`}
//                     >
//                       {s.label}: {s.value}/10
//                     </span>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//       </div>

//       {/* Buttons — ref ke bahar hain taaki PDF mein na aaye */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="flex gap-4 pb-10 max-w-4xl mx-auto mt-6"
//       >
//         <button
//           onClick={() => navigate("/")}
//           className="flex-1 h-14 rounded-2xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2"
//         >
//           <FaHome /> Go Home
//         </button>

//         {/* ✅ PDF Download Button */}
//         <button
//           onClick={handleDownloadPDF}
//           className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
//         >
//           <FaDownload /> Download PDF
//         </button>

//         <button
//           onClick={() => navigate("/interview")}
//           className="flex-1 h-14 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
//         >
//           <FaRedo /> Try Again
//         </button>
//       </motion.div>

//     </div>
//   );
// }

// export default InterviewReport;




// .....................................................................







import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Note: Use 'framer-motion'
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  FaTrophy, FaBrain, FaComments, FaCheckCircle, 
  FaRedo, FaHome, FaDownload, FaChartLine
} from "react-icons/fa";

import InterviewReportPDF from "../pdf/InterviewReportPDF";

function InterviewReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const report = location.state?.report;

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">No Report Found</h2>
        <button onClick={() => navigate("/")} className="mt-4 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold">
          Go Home
        </button>
      </div>
    );
  }

  const { finalScore = 0, confidence = 0, communication = 0, correctness = 0, questionWiseScore = [] } = report;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<InterviewReportPDF report={report} />).toBlob();
      saveAs(blob, `InterviewIQ_Report_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7) return "text-emerald-600";
    if (score >= 4) return "text-amber-500";
    return "text-rose-500";
  };

  const getBarColor = (score) => {
    if (score >= 7) return "bg-emerald-500";
    if (score >= 4) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Hero Stats */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Main Circular Score */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className={`w-48 h-48 rounded-[3rem] border-8 flex flex-col items-center justify-center bg-white shadow-2xl shadow-emerald-100 ${finalScore >= 7 ? 'border-emerald-100' : 'border-rose-100'}`}>
              <FaTrophy className={`text-2xl mb-1 ${getScoreColor(finalScore)}`} />
              <div className={`text-6xl font-black ${getScoreColor(finalScore)}`}>{finalScore}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Score</div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">Assessment Complete.</h1>
              <p className="text-slate-500 text-lg">Great job! You've successfully finished your mock interview.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Confidence", val: confidence, icon: <FaBrain />, color: 'emerald' },
                { label: "Communication", val: communication, icon: <FaComments />, color: 'blue' },
                { label: "Accuracy", val: correctness, icon: <FaCheckCircle />, color: 'indigo' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                    <span className={`text-xs font-bold ${getScoreColor(stat.val)}`}>{stat.val}/10</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.val * 10}%` }}
                      className={`h-full ${getBarColor(stat.val)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-12 px-4 space-y-8">
        
        {/* Action Buttons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="h-14 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><FaDownload /> Download Report</>
            )}
          </button>
          <button onClick={() => navigate("/interview")} className="h-14 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-3">
            <FaRedo /> Try Again
          </button>
          <button onClick={() => navigate("/")} className="h-14 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-3">
            <FaHome /> Dashboard
          </button>
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <FaChartLine className="text-emerald-500" />
            <h2 className="text-xl font-black text-slate-800">Question-wise Breakdown</h2>
          </div>

          {questionWiseScore.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="bg-white border border-slate-200 p-8 rounded-3xl hover:border-emerald-200 transition-all group"
            >
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Question {idx + 1}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-800 leading-relaxed">{q.question}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black text-xl shadow-inner ${q.score >= 7 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {q.score}
                  <span className="text-[8px] text-slate-400 font-bold -mt-1 uppercase">Score</span>
                </div>
              </div>

              {q.feedback && (
                <div className="mt-6 p-5 bg-slate-50 rounded-2xl border-l-4 border-emerald-400 italic text-sm text-slate-600">
                  "{q.feedback}"
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewReport;