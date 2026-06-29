// import React from 'react'

// function Step3Report(report) {
//   return (
//     <div>Step3Report</div>
//   )
// }

// export default Step3Report




import React from "react";
import { motion } from "motion/react";
import {
  FaTrophy,
  FaBrain,
  FaComments,
  FaCheckCircle,
  FaRedo,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Step3Report({ report }) {
  const navigate = useNavigate();

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  // Score ke hisaab se color
  const getScoreColor = (score) => {
    if (score >= 7) return "text-green-600";
    if (score >= 4) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 7) return "bg-green-100";
    if (score >= 4) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Average";
    return "Needs Improvement";
  };

  // Progress bar width
  const getBarWidth = (score) => `${(score / 10) * 100}%`;

  const getBarColor = (score) => {
    if (score >= 7) return "bg-green-500";
    if (score >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <FaTrophy className="text-3xl text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Interview Complete!</h1>
          <p className="text-gray-500 mt-2">Here's your detailed performance report</p>
        </motion.div>

        {/* ─── Final Score Card ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <p className="text-gray-500 font-medium mb-2">Overall Score</p>
          <div className={`text-7xl font-bold ${getScoreColor(finalScore)}`}>
            {finalScore}
            <span className="text-3xl text-gray-400">/10</span>
          </div>
          <span className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-semibold ${getScoreBg(finalScore)} ${getScoreColor(finalScore)}`}>
            {getScoreLabel(finalScore)}
          </span>
        </motion.div>

        {/* ─── Stats Grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Confidence", value: confidence, icon: <FaBrain /> },
            { label: "Communication", value: communication, icon: <FaComments /> },
            { label: "Correctness", value: correctness, icon: <FaCheckCircle /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-5 text-center">
              <div className="text-2xl text-emerald-500 flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(stat.value)}`}>
                {stat.value}
              </div>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>

              {/* Progress bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: getBarWidth(stat.value) }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                  className={`h-full rounded-full ${getBarColor(stat.value)}`}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* ─── Question Wise Breakdown ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Question-wise Breakdown
          </h2>

          <div className="space-y-4">
            {questionWiseScore.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
              >
                {/* Question */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                      Question {index + 1}
                    </span>
                    <p className="mt-1 text-gray-800 font-medium">{q.question}</p>
                  </div>

                  {/* Score badge */}
                  <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg ${getScoreBg(q.score)} ${getScoreColor(q.score)}`}>
                    {q.score}/10
                  </div>
                </div>

                {/* Feedback */}
                {q.feedback && (
                  <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Feedback: </span>
                      {q.feedback}
                    </p>
                  </div>
                )}

                {/* Mini stats */}
                <div className="mt-3 flex gap-3 flex-wrap">
                  {[
                    { label: "Confidence", value: q.confidence },
                    { label: "Communication", value: q.communication },
                    { label: "Correctness", value: q.correctness },
                  ].map((s, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getScoreBg(s.value)} ${getScoreColor(s.value)}`}
                    >
                      {s.label}: {s.value}/10
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Action Buttons ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 pb-10"
        >
          <button
            onClick={() => navigate("/")}
            className="flex-1 h-14 rounded-2xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2"
          >
            <FaHome /> Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex-1 h-14 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
          >
            <FaRedo /> Try Again
          </button>
        </motion.div>

      </div>
    </div>
  );
}

export default Step3Report;