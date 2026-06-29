// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "motion/react";
// import axios from "axios";

// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import {
//   FaTrophy,
//   FaHistory,
//   FaPlus,
//   FaBrain,
//   FaComments,
//   FaCheckCircle,
//   FaDownload,
//   FaChevronDown,
//   FaChevronUp,
//   FaBriefcase,
//   FaClock,
// } from "react-icons/fa";
// import { serverUrl } from "../App";
// import Navbar from "../components/Navbar";

// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// function InterviewHistory() {
//   const navigate = useNavigate();
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedId, setExpandedId] = useState(null);
//   const reportRefs = useRef({});

//   const fetchHistory = async () => {
//     try {
//       const { data } = await axios.get(serverUrl + "/api/interview/history", {
//         withCredentials: true,
//       });
//       setInterviews(data.interviews || []);
//     } catch (err) {
//       console.error("History fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

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

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

// const handleDownloadPDF = async (interviewId) => {
//     try {
//       // 1. Force the card to expand
//       setExpandedId(interviewId);

//       // 2. WAIT longer for Framer Motion to 100% finish animating
//       // 300ms was too fast; it was capturing a transparent element!
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const element = reportRefs.current[interviewId];
//       if (!element) {
//         console.error("Report element not found");
//         return;
//       }

//       // 3. Capture DOM to Canvas with Scroll Fixes
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#ffffff",
//         // These properties force the canvas to look at the right spot on the screen
//         scrollX: 0,
//         scrollY: -window.scrollY,
//         windowWidth: document.documentElement.offsetWidth,
//       });

//       const imgData = canvas.toDataURL("image/jpeg", 1.0);

//       // 4. Assemble standard A4 PDF
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`InterviewIQ_Report_${interviewId}.pdf`);

//     } catch (err) {
//       console.error("PDF Generation Error:", err);
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   // ─── Loading ───
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-100">
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//             <p className="text-gray-500 font-medium">
//               Loading your interviews...
//             </p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 pt-24 pb-16 px-4">
//         <div className="max-w-4xl mx-auto">
//           {/* ─── Header ─── */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
//           >
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
//                   <FaHistory className="text-emerald-600 text-lg" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800">
//                   Interview History
//                 </h1>
//               </div>
//               <p className="text-gray-500 mt-1 ml-13">
//                 {interviews.length > 0
//                   ? `${interviews.length} interview${interviews.length > 1 ? "s" : ""} completed`
//                   : "No interviews yet"}
//               </p>
//             </div>

//             <button
//               onClick={() => navigate("/interview")}
//               className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
//             >
//               <FaPlus /> New Interview
//             </button>
//           </motion.div>

//           {/* ─── No Interview Yet ─── */}
//           {interviews.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-3xl shadow-xl p-16 text-center"
//             >
//               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FaHistory className="text-5xl text-emerald-300" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-700 mb-3">
//                 No Interviews Yet!
//               </h2>
//               <p className="text-gray-400 max-w-sm mx-auto mb-8">
//                 You haven't given any mock interviews yet. Start your first
//                 AI-powered interview now and track your progress!
//               </p>
//               <button
//                 onClick={() => navigate("/interview")}
//                 className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition shadow-lg text-lg"
//               >
//                 Start Your First Interview 🚀
//               </button>
//             </motion.div>
//           )}

//           {/* ─── Interview Cards ─── */}
//           <div className="space-y-4">
//             {interviews.map((interview, idx) => {
//               const isExpanded = expandedId === interview._id;
//               const avgConfidence =
//                 interview.questions?.reduce(
//                   (a, q) => a + (q.confidence || 0),
//                   0,
//                 ) / (interview.questions?.length || 1);
//               const avgCommunication =
//                 interview.questions?.reduce(
//                   (a, q) => a + (q.communication || 0),
//                   0,
//                 ) / (interview.questions?.length || 1);
//               const avgCorrectness =
//                 interview.questions?.reduce(
//                   (a, q) => a + (q.correctness || 0),
//                   0,
//                 ) / (interview.questions?.length || 1);

//               return (
//                 <motion.div
//                   key={interview._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.08 }}
//                   className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* ─── Card Header ─── */}
//                   <div className="p-6">
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1">
//                         {/* Role + Badge */}
//                         <div className="flex items-center gap-3 flex-wrap">
//                           <h3 className="text-lg font-bold text-gray-800 capitalize">
//                             {interview.role}
//                           </h3>
//                           <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold capitalize">
//                             {interview.mode}
//                           </span>
//                           <span
//                             className={`text-xs px-3 py-1 rounded-full font-semibold ${getScoreBg(interview.finalScore)} ${getScoreColor(interview.finalScore)}`}
//                           >
//                             {getScoreLabel(interview.finalScore)}
//                           </span>
//                         </div>

//                         {/* Meta info */}
//                         <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
//                           <span className="flex items-center gap-1">
//                             <FaBriefcase className="text-xs" />
//                             {interview.experience} yr exp
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <FaClock className="text-xs" />
//                             {formatDate(interview.createdAt)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Score */}
//                       <div
//                         className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold ${getScoreBg(interview.finalScore)}`}
//                       >
//                         <span
//                           className={`text-2xl font-bold ${getScoreColor(interview.finalScore)}`}
//                         >
//                           {interview.finalScore}
//                         </span>
//                         <span className="text-xs text-gray-400">/10</span>
//                       </div>
//                     </div>

//                     {/* Mini Stats */}
//                     <div className="mt-4 grid grid-cols-3 gap-3">
//                       {[
//                         {
//                           label: "Confidence",
//                           value: parseFloat(avgConfidence.toFixed(1)),
//                           icon: <FaBrain />,
//                         },
//                         {
//                           label: "Communication",
//                           value: parseFloat(avgCommunication.toFixed(1)),
//                           icon: <FaComments />,
//                         },
//                         {
//                           label: "Correctness",
//                           value: parseFloat(avgCorrectness.toFixed(1)),
//                           icon: <FaCheckCircle />,
//                         },
//                       ].map((s, i) => (
//                         <div
//                           key={i}
//                           className="bg-gray-50 rounded-xl p-3 text-center"
//                         >
//                           <div className={`text-sm ${getScoreColor(s.value)}`}>
//                             {s.icon}
//                           </div>
//                           <div
//                             className={`text-lg font-bold mt-1 ${getScoreColor(s.value)}`}
//                           >
//                             {s.value}
//                           </div>
//                           <div className="text-xs text-gray-400">{s.label}</div>
//                           <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className={`h-full rounded-full ${getBarColor(s.value)}`}
//                               style={{ width: `${(s.value / 10) * 100}%` }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="mt-4 flex gap-3">
//                       <button
//                         onClick={() => toggleExpand(interview._id)}
//                         className="flex-1 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
//                       >
//                         {isExpanded ? (
//                           <>
//                             <FaChevronUp /> Hide Details
//                           </>
//                         ) : (
//                           <>
//                             <FaChevronDown /> View Details
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleDownloadPDF(interview._id)}
//                         className="flex-1 h-10 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
//                       >
//                         <FaDownload /> Download PDF
//                       </button>
//                     </div>
//                   </div>

//                   {/* ─── Expandable Question Breakdown ─── */}
//                   {/* {isExpanded && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       ref={(el) => (reportRefs.current[interview._id] = el)}
//                       className="border-t border-gray-100 p-6"
//                     > */}
//                   {/* ............................................................................................................................... */}
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       ref={(el) => (reportRefs.current[interview._id] = el)}
//                       className="border-t border-gray-100 p-6"
//                       // Force standard hex/rgb colors to override any inherited oklch values
//                       style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
//                     >
//                       <h4 className="font-bold text-gray-700 mb-4">
//                         Question-wise Breakdown
//                       </h4>
//                       <div className="space-y-3">
//                         {interview.questions?.map((q, qIdx) => (
//                           <div
//                             key={qIdx}
//                             className="border border-gray-100 rounded-2xl p-4"
//                           >
//                             <div className="flex items-start justify-between gap-3">
//                               <div className="flex-1">
//                                 <span className="text-xs font-semibold text-emerald-600 uppercase">
//                                   Q{qIdx + 1} · {q.difficulty}
//                                 </span>
//                                 <p className="mt-1 text-sm text-gray-800 font-medium">
//                                   {q.question}
//                                 </p>
//                               </div>
//                               <div
//                                 className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${getScoreBg(q.score)} ${getScoreColor(q.score)}`}
//                               >
//                                 {q.score}/10
//                               </div>
//                             </div>

//                             {q.feedback && (
//                               <div className="mt-2 bg-gray-50 rounded-xl px-3 py-2">
//                                 <p className="text-xs text-gray-600">
//                                   <span className="font-semibold">
//                                     Feedback:{" "}
//                                   </span>
//                                   {q.feedback}
//                                 </p>
//                               </div>
//                             )}

//                             <div className="mt-2 flex gap-2 flex-wrap">
//                               {[
//                                 { label: "Confidence", value: q.confidence },
//                                 {
//                                   label: "Communication",
//                                   value: q.communication,
//                                 },
//                                 { label: "Correctness", value: q.correctness },
//                               ].map((s, i) => (
//                                 <span
//                                   key={i}
//                                   className={`text-xs px-2 py-1 rounded-full font-medium ${getScoreBg(s.value)} ${getScoreColor(s.value)}`}
//                                 >
//                                   {s.label}: {s.value}/10
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default InterviewHistory;

// ......................................................................................................

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Icons
import {
  FaHistory,
  FaPlus,
  FaBrain,
  FaComments,
  FaCheckCircle,
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaClock,
  FaTrophy,
} from "react-icons/fa";

import { serverUrl } from "../App";
import Navbar from "../components/Navbar";
// import InterviewReport from "./InterviewReport"; // We will create this below

import InterviewReportPDF from "../pdf/InterviewReportPDF";

function InterviewHistory() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/interview/history", {
        withCredentials: true,
      });
      setInterviews(data.interviews || []);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // PDF Generation Handler
  const handleDownloadPDF = async (interview) => {
    setDownloadingId(interview._id);
    try {
      const blob = await pdf(
        <InterviewReportPDF interview={interview} />,
      ).toBlob();
      saveAs(
        blob,
        `InterviewIQ_Report_${interview.role.replace(/\s+/g, "_")}.pdf`,
      );
    } catch (err) {
      console.error("PDF Export Error:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7) return "text-emerald-600";
    if (score >= 4) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBg = (score) => {
    if (score >= 7) return "bg-emerald-50 border-emerald-100";
    if (score >= 4) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">
          Analyzing your progress...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-white pt-6 pb-20 px-4">
        {" "}
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-white shadow-sm rounded-2xl">
                  <FaHistory className="text-emerald-600 text-xl" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  Analytics
                </h1>
              </div>
              <p className="text-slate-500 text-lg ml-1">
                Track your performance across {interviews.length} sessions.
              </p>
            </div>
            <button
              onClick={() => navigate("/interview")}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-200"
            >
              <FaPlus /> Start New Session
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {interviews.map((interview, idx) => {
              const isExpanded = expandedId === interview._id;

              // Helper to calculate averages safely
              const getAvg = (key) => {
                const total = interview.questions?.reduce(
                  (a, q) => a + (q[key] || 0),
                  0,
                );
                return (total / (interview.questions?.length || 1)).toFixed(1);
              };

              return (
                <motion.div
                  key={interview._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left: Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold tracking-widest uppercase">
                            {interview.mode}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1.5 text-sm text-slate-400">
                            <FaClock className="text-xs" />{" "}
                            {formatDate(interview.createdAt)}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 capitalize mb-2">
                          {interview.role}
                        </h3>
                        <p className="text-slate-500 flex items-center gap-2 mb-6">
                          <FaBriefcase className="text-emerald-500" />{" "}
                          {interview.experience} Years Experience
                        </p>

                        {/* Progress Bar Indicators */}
                        <div className="grid grid-cols-3 gap-6">
                          {[
                            {
                              label: "Logic",
                              val: getAvg("confidence"),
                              icon: <FaBrain />,
                              color: "emerald",
                            },
                            {
                              label: "Speech",
                              val: getAvg("communication"),
                              icon: <FaComments />,
                              color: "blue",
                            },
                            {
                              label: "Accuracy",
                              val: getAvg("correctness"),
                              icon: <FaCheckCircle />,
                              color: "indigo",
                            },
                          ].map((stat, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  {stat.label}
                                </span>
                                <span className="text-xs font-bold text-slate-700">
                                  {stat.val}/10
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stat.val * 10}%` }}
                                  className={`h-full bg-${stat.color}-500 rounded-full`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Score Circular UI */}
                      <div className="flex flex-col items-center justify-center lg:border-l lg:border-slate-100 lg:pl-12">
                        <div
                          className={`relative w-28 h-28 flex flex-col items-center justify-center rounded-3xl border-2 ${getScoreBg(interview.finalScore)}`}
                        >
                          <span
                            className={`text-4xl font-black ${getScoreColor(interview.finalScore)}`}
                          >
                            {interview.finalScore}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Overall
                          </span>
                        </div>

                        <div className="mt-6 flex flex-col gap-2 w-full">
                          <button
                            onClick={() => handleDownloadPDF(interview)}
                            disabled={downloadingId === interview._id}
                            className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-blue-100"
                          >
                            {downloadingId === interview._id ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <FaDownload /> Report
                              </>
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setExpandedId(isExpanded ? null : interview._id)
                            }
                            className="w-full py-3 text-slate-500 text-sm font-bold hover:text-slate-800 transition-all flex items-center justify-center gap-2"
                          >
                            {isExpanded ? (
                              <>
                                <FaChevronUp /> Hide
                              </>
                            ) : (
                              <>
                                <FaChevronDown /> Details
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50/50 border-t border-slate-100"
                      >
                        <div className="p-8 space-y-4">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                            Detailed Breakdown
                          </h4>
                          {interview.questions?.map((q, qIdx) => (
                            <div
                              key={qIdx}
                              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60"
                            >
                              <div className="flex justify-between items-start gap-4 mb-4">
                                <div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded uppercase mr-2">
                                    Q{qIdx + 1}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                                    {q.difficulty}
                                  </span>
                                  <p className="mt-2 text-slate-800 font-bold leading-relaxed">
                                    {q.question}
                                  </p>
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-lg font-black text-lg ${getScoreBg(q.score)} ${getScoreColor(q.score)}`}
                                >
                                  {q.score}
                                </div>
                              </div>
                              {q.feedback && (
                                <div className="pl-4 border-l-2 border-emerald-200 italic text-sm text-slate-600 mb-4">
                                  "{q.feedback}"
                                </div>
                              )}
                              <div className="flex gap-4">
                                {[
                                  "confidence",
                                  "communication",
                                  "correctness",
                                ].map((k) => (
                                  <div
                                    key={k}
                                    className="text-[10px] font-bold text-slate-400 uppercase"
                                  >
                                    {k}:{" "}
                                    <span className="text-slate-700">
                                      {q[k]}/10
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default InterviewHistory;
