import React, { useState, useEffect } from "react";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { HiMiniSignal } from "react-icons/hi2";
import axios from "axios";
import femaleVideo from "../assets/videos/female-ai.mp4";

import Timer from "../components/Timer";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis.js";
import useSpeechRecognition from "../hooks/useSpeechRecognition.js";
import { serverUrl } from "../App";

function Step2Interview({ interviewData, onFinish }) {
  const questions = interviewData?.questions || [];
  const interviewId = interviewData?.interviewId;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [status, setStatus] = useState("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const { speaking, speak, stop } = useSpeechSynthesis();
  const {
    transcript,
    listening,
    supported: micSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!currentQuestion) return;

    setAnswer("");
    resetTranscript();
    setTimerActive(false);
    setStatus("ai-speaking");

    const timeout = setTimeout(() => {
      speak(currentQuestion.question, () => {
        setStatus("listening");
        setTimerActive(true);
      });
    }, 600);

    return () => {
      clearTimeout(timeout);
      stop();
    };
  }, [currentIndex]);

  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  const handleMicToggle = () => {
    if (!micSupported) {
      alert(
        "Your browser doesn't support Speech Recognition. Please use Chrome.",
      );
      return;
    }
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (isSubmitting) return;

    const finalAnswer = answer.trim();
    stopListening();
    window.speechSynthesis.cancel();
    setTimerActive(false);
    setIsSubmitting(true);
    setStatus("evaluating");

    const isLastQuestion = currentIndex + 1 === questions.length;

    const transitionMessage = isLastQuestion
      ? autoSubmit
        ? "Time's up! Evaluating your final answer."
        : "Great answer! Please wait while I evaluate your performance."
      : autoSubmit
        ? "Time's up! Evaluating your answer."
        : "Great answer! Moving to the next question.";

    await new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(transitionMessage);
      utterance.rate = 1;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      window.speechSynthesis.speak(utterance);
    });

    try {
      await axios.post(
        serverUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer: finalAnswer || "",
          timeTaken: currentQuestion.timeLimit,
        },
        { withCredentials: true },
      );

      if (!isLastQuestion) {
        setTimerKey((prev) => prev + 1);
        setCurrentIndex((prev) => prev + 1);
        setIsSubmitting(false);
      } else {
        setStatus("finished");

        await new Promise((resolve) => {
          const doneUtterance = new SpeechSynthesisUtterance(
            "Great job! You have successfully completed your interview. Generating your performance report now.",
          );
          doneUtterance.rate = 0.95;
          doneUtterance.onend = resolve;
          doneUtterance.onerror = resolve;
          window.speechSynthesis.speak(doneUtterance);
        });

        await handleFinish();
      }
    } catch (err) {
      console.error("Submit error:", err);
      setIsSubmitting(false);
      setStatus("listening");
    }
  };

  const handleFinish = async () => {
    try {
      const res = await axios.post(
        serverUrl + "/api/interview/finish-interview",
        { interviewId },
        { withCredentials: true },
      );
      if (onFinish) onFinish(res.data);
    } catch (err) {
      console.error("Finish error:", err);
    }
  };

  const handleTimerComplete = () => {
    handleSubmit(true);
  };

  const getStatusText = () => {
    switch (status) {
      case "ai-speaking":
        return "AI Speaking...";
      case "listening":
        return "Listening...";
      case "evaluating":
        return "Evaluating Answer...";
      case "finished":
        return "Interview Complete!";
      default:
        return "Please wait...";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 flex items-center justify-center p-3 sm:p-5 lg:p-8">
      <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl shadow-gray-900/10 border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-6 flex flex-col bg-gradient-to-b from-gray-50/50 to-white">
          {/* AI Video */}
          <div className="overflow-hidden rounded-2xl shadow-md relative ring-1 ring-gray-100">
            <video
              src={femaleVideo}
              autoPlay={speaking}
              loop
              muted
              playsInline
              ref={(el) => {
                if (el) {
                  speaking ? el.play() : el.pause();
                }
              }}
              className="w-full h-auto object-cover"
            />

            {speaking && (
              <div className="absolute bottom-3 left-3 flex gap-1 items-end">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full animate-bounce"
                    style={{
                      height: `${8 + i * 4}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                AI Smart Interview
              </h2>
              <p
                className={`text-sm font-medium ${
                  status === "ai-speaking"
                    ? "text-emerald-500"
                    : status === "listening"
                      ? "text-blue-500"
                      : status === "evaluating"
                        ? "text-orange-500"
                        : "text-gray-400"
                }`}
              >
                {getStatusText()}
              </p>
            </div>
            <HiMiniSignal
              className={`text-2xl ${speaking ? "text-emerald-500 animate-pulse" : "text-gray-300"}`}
            />
          </div>

          {/* Timer */}
          <div className="mt-8 flex justify-center">
            <Timer
              key={timerKey}
              duration={currentQuestion?.timeLimit || 60}
              active={timerActive}
              onComplete={handleTimerComplete}
            />
          </div>

          {/* Question count */}
          <div className="mt-6 flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span>Question {currentIndex + 1}</span>
            <span>{questions.length} Questions</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-5 sm:p-8 flex flex-col">
          {/* Question */}
          <div>
            <p className="text-emerald-600 font-bold text-sm">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug tracking-tight">
              {currentQuestion?.question}
            </h1>
            <span
              className={`mt-3 inline-block text-xs font-bold px-3 py-1 rounded-full ${
                currentQuestion?.difficulty === "Easy"
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : currentQuestion?.difficulty === "Medium"
                    ? "bg-amber-50 text-amber-700 border border-amber-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
            >
              {currentQuestion?.difficulty}
            </span>
          </div>

          {/* Textarea */}
          <div className="flex-1 mt-6">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={status === "evaluating" || status === "finished"}
              placeholder={
                status === "ai-speaking"
                  ? "Wait for AI to finish speaking..."
                  : status === "evaluating"
                    ? "Evaluating your answer..."
                    : listening
                      ? "Speaking... (your words will appear here)"
                      : "Type your answer here or click the mic to speak..."
              }
              className="w-full h-60 sm:h-72 lg:h-full resize-none rounded-2xl border border-gray-200 p-5 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none text-gray-700 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-shadow"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* Mic */}
            <button
              onClick={handleMicToggle}
              disabled={status !== "listening" || isSubmitting}
              className={`w-full sm:w-14 h-14 rounded-2xl sm:rounded-full flex items-center justify-center transition-all
                ${
                  listening
                    ? "bg-red-500 text-white animate-pulse scale-105 shadow-lg shadow-red-200"
                    : status === "listening"
                      ? "bg-gray-900 text-white hover:scale-105"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
            >
              {listening ? (
                <BsMicFill size={20} />
              ) : (
                <BsMicMuteFill size={20} />
              )}
            </button>

            {/* Submit */}
            <button
              onClick={() => handleSubmit(false)}
              disabled={
                isSubmitting ||
                status === "ai-speaking" ||
                status === "finished"
              }
              className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-xl disabled:bg-gray-200 disabled:shadow-none disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting
                ? "Evaluating..."
                : currentIndex + 1 === questions.length
                  ? "Finish Interview"
                  : "Submit Answer →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
