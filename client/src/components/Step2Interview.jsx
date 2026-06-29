// import React from "react";
// import { BsMicFill } from "react-icons/bs";
// import { HiMiniSignal } from "react-icons/hi2";

// import femaleVideo from "../assets/videos/female-ai.mp4";
// import maleVideo from "../assets/videos/male-ai.mp4";

// import Timer from "../components/Timer";

// function Step2Interview({ interviewData }) {
//   const { questions } = interviewData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-3 sm:p-5 lg:p-8">
//       <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
//         {/* LEFT SIDE */}

//         <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-200 p-5 sm:p-6 flex flex-col">
//           <div className="overflow-hidden rounded-2xl shadow-md">
//             <video
//               src={femaleVideo}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-auto object-cover"
//             />
//           </div>

//           <div className="mt-5 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold text-emerald-700">
//                 AI Smart Interview
//               </h2>

//               <p className="text-sm text-gray-500">
//                 AI Speaking...
//               </p>
//             </div>

//             <HiMiniSignal className="text-3xl text-emerald-600" />
//           </div>

//           <div className="mt-8 flex justify-center">
//             <Timer
//               duration={60}
//               onComplete={() => console.log("Time Up")}
//             />
//           </div>

//           <div className="mt-6 flex justify-between text-sm text-gray-500 font-medium">
//             <span>Question 1</span>
//             <span>{questions.length} Questions</span>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}

//         <div className="flex-1 p-5 sm:p-8 flex flex-col">
//           <div>
//             <p className="text-emerald-600 font-semibold text-sm sm:text-base">
//               Question 1 of {questions.length}
//             </p>

//             <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
//               {questions[0].question}
//             </h1>
//           </div>

//           <div className="flex-1 mt-6">
//             <textarea
//               placeholder="Your answer will appear here..."
//               className="w-full h-60 sm:h-72 lg:h-full resize-none rounded-2xl border border-gray-300 p-5 focus:ring-2 focus:ring-emerald-500 outline-none"
//             />
//           </div>

//           <div className="mt-6 flex flex-col sm:flex-row gap-4">
//             <button className="w-full sm:w-14 h-14 rounded-xl sm:rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition">
//               <BsMicFill size={22} />
//             </button>

//             <button className="flex-1 h-14 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
//               Submit Answer
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Step2Interview;

// ......................................................................................................
// import React, { useState, useEffect } from "react";
// import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
// import { HiMiniSignal } from "react-icons/hi2";
// import axios from "axios";

// import femaleVideo from "../assets/videos/female-ai.mp4";
// import Timer from "../components/Timer";
// import useSpeechSynthesis from "../hooks/useSpeechSynthesis.js";
// import useSpeechRecognition from "../hooks/useSpeechRecognition.js";

// function Step2Interview({ interviewData, onFinish }) {
//   // const { questions, _id: interviewId } = interviewData;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [timerActive, setTimerActive] = useState(false);
//   const [status, setStatus] = useState("loading");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [timerKey, setTimerKey] = useState(0);

//   const { speaking, speak, stop } = useSpeechSynthesis();
//   const {
//     transcript,
//     listening,
//     supported: micSupported,
//     startListening,
//     stopListening,
//     resetTranscript,
//   } = useSpeechRecognition();

//   const currentQuestion = questions[currentIndex];

//   useEffect(() => {
//     if (!currentQuestion) return;

//     setAnswer("");
//     resetTranscript();
//     setTimerActive(false);
//     setStatus("ai-speaking");

//     const timeout = setTimeout(() => {
//       speak(currentQuestion.question, () => {
//         setStatus("listening");
//         setTimerActive(true);
//       });
//     }, 600);

//     return () => {
//       clearTimeout(timeout);
//       stop();
//     };
//   }, [currentIndex]);

//   useEffect(() => {
//     if (transcript) {
//       setAnswer(transcript);
//     }
//   }, [transcript]);

//   const handleMicToggle = () => {
//     if (!micSupported) {
//       alert(
//         "Your browser doesn't support Speech Recognition. Please use Chrome.",
//       );
//       return;
//     }
//     if (listening) {
//       stopListening();
//     } else {
//       resetTranscript();
//       startListening();
//     }
//   };

//   // const handleSubmit = async (autoSubmit = false) => {
//   //   if (isSubmitting) return;

//   //   const finalAnswer = answer.trim();
//   //   stopListening();
//   //   stop();
//   //   setTimerActive(false);
//   //   setIsSubmitting(true);
//   //   setStatus("evaluating");

//   //   try {
//   //     await axios.post(
//   //       "/api/interview/submit-answer",
//   //       {
//   //         interviewId,
//   //         questionIndex: currentIndex,
//   //         answer: finalAnswer || "",
//   //         timeTaken: currentQuestion.timeLimit,
//   //       },
//   //       { withCredentials: true }
//   //     );

//   //     if (currentIndex + 1 < questions.length) {
//   //       setTimerKey((prev) => prev + 1); // ✅ Fix
//   //       setCurrentIndex((prev) => prev + 1);
//   //       setIsSubmitting(false);
//   //     } else {
//   //       setStatus("finished");
//   //       await handleFinish();
//   //     }
//   //   } catch (err) {
//   //     console.error("Submit error:", err);
//   //     setIsSubmitting(false);
//   //     setStatus("listening");
//   //   }
//   // };

//   const handleSubmit = async (autoSubmit = false) => {
//     if (isSubmitting) return;

//     const finalAnswer = answer.trim();
//     stopListening();
//     window.speechSynthesis.cancel();
//     setTimerActive(false);
//     setIsSubmitting(true);
//     setStatus("evaluating");

//     // ─── AI transition speech ───
//     const transitionMessage = autoSubmit
//       ? "Time's up! Evaluating your answer."
//       : "Great answer! Moving to the next question.";

//     // Pehle AI bolega, phir API call
//     await new Promise((resolve) => {
//       const utterance = new SpeechSynthesisUtterance(transitionMessage);
//       utterance.rate = 1;
//       utterance.onend = resolve;
//       utterance.onerror = resolve;
//       window.speechSynthesis.speak(utterance);
//     });

//     try {
//       await axios.post(
//         "/api/interview/submit-answer",
//         {
//           interviewId,
//           questionIndex: currentIndex,
//           answer: finalAnswer || "",
//           timeTaken: currentQuestion.timeLimit,
//         },
//         { withCredentials: true },
//       );

//       if (currentIndex + 1 < questions.length) {
//         setTimerKey((prev) => prev + 1);
//         setCurrentIndex((prev) => prev + 1);
//         setIsSubmitting(false);
//       } else {
//         // Last question
//         const doneUtterance = new SpeechSynthesisUtterance(
//           "Excellent! You have completed all questions. Generating your report now.",
//         );
//         window.speechSynthesis.speak(doneUtterance);
//         setStatus("finished");
//         await handleFinish();
//       }
//     } catch (err) {
//       console.error("Submit error:", err);
//       setIsSubmitting(false);
//       setStatus("listening");
//     }
//   };

//   const handleFinish = async () => {
//     try {
//       const res = await axios.post(
//         "/api/interview/finish-interview",
//         { interviewId },
//         { withCredentials: true },
//       );
//       if (onFinish) onFinish(res.data);
//     } catch (err) {
//       console.error("Finish error:", err);
//     }
//   };

//   const handleTimerComplete = () => {
//     handleSubmit(true);
//   };

//   const getStatusText = () => {
//     switch (status) {
//       case "ai-speaking":
//         return "AI Speaking...";
//       case "listening":
//         return "Listening...";
//       case "evaluating":
//         return "Evaluating Answer...";
//       case "finished":
//         return "Interview Complete!";
//       default:
//         return "Please wait...";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-3 sm:p-5 lg:p-8">
//       <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
//         {/* LEFT SIDE */}
//         <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-200 p-5 sm:p-6 flex flex-col">
//           {/* AI Video */}
//           <div className="overflow-hidden rounded-2xl shadow-md relative">
//             <video
//               src={femaleVideo}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-auto object-cover"
//             />
//             {speaking && (
//               <div className="absolute bottom-3 left-3 flex gap-1 items-end">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="w-1 bg-emerald-400 rounded-full animate-bounce"
//                     style={{
//                       height: `${8 + i * 4}px`,
//                       animationDelay: `${i * 0.1}s`,
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Status */}
//           <div className="mt-5 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold text-emerald-700">
//                 AI Smart Interview
//               </h2>
//               <p
//                 className={`text-sm font-medium ${
//                   status === "ai-speaking"
//                     ? "text-emerald-500"
//                     : status === "listening"
//                       ? "text-blue-500"
//                       : status === "evaluating"
//                         ? "text-orange-500"
//                         : "text-gray-500"
//                 }`}
//               >
//                 {getStatusText()}
//               </p>
//             </div>
//             <HiMiniSignal
//               className={`text-3xl ${speaking ? "text-emerald-500 animate-pulse" : "text-gray-400"}`}
//             />
//           </div>

//           {/* Timer */}
//           <div className="mt-8 flex justify-center">
//             <Timer
//               key={timerKey}
//               duration={currentQuestion?.timeLimit || 60}
//               active={timerActive}
//               onComplete={handleTimerComplete}
//             />
//           </div>

//           {/* Question count */}
//           <div className="mt-6 flex justify-between text-sm text-gray-500 font-medium">
//             <span>Question {currentIndex + 1}</span>
//             <span>{questions.length} Questions</span>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex-1 p-5 sm:p-8 flex flex-col">
//           {/* Question */}
//           <div>
//             <p className="text-emerald-600 font-semibold text-sm sm:text-base">
//               Question {currentIndex + 1} of {questions.length}
//             </p>
//             <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
//               {currentQuestion?.question}
//             </h1>
//             <span
//               className={`mt-2 inline-block text-xs font-semibold px-3 py-1 rounded-full ${
//                 currentQuestion?.difficulty === "Easy"
//                   ? "bg-green-100 text-green-700"
//                   : currentQuestion?.difficulty === "Medium"
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//               }`}
//             >
//               {currentQuestion?.difficulty}
//             </span>
//           </div>

//           {/* Textarea */}
//           <div className="flex-1 mt-6">
//             <textarea
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               disabled={status === "evaluating" || status === "finished"}
//               placeholder={
//                 status === "ai-speaking"
//                   ? "Wait for AI to finish speaking..."
//                   : status === "evaluating"
//                     ? "Evaluating your answer..."
//                     : listening
//                       ? "Speaking... (your words will appear here)"
//                       : "Type your answer here or click the mic to speak..."
//               }
//               className="w-full h-60 sm:h-72 lg:h-full resize-none rounded-2xl border border-gray-300 p-5 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex flex-col sm:flex-row gap-4">
//             {/* Mic */}
//             <button
//               onClick={handleMicToggle}
//               disabled={status !== "listening" || isSubmitting}
//               className={`w-full sm:w-14 h-14 rounded-xl sm:rounded-full flex items-center justify-center transition-all
//                 ${
//                   listening
//                     ? "bg-red-500 text-white animate-pulse scale-105"
//                     : status === "listening"
//                       ? "bg-black text-white hover:scale-105"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 }`}
//             >
//               {listening ? (
//                 <BsMicFill size={22} />
//               ) : (
//                 <BsMicMuteFill size={22} />
//               )}
//             </button>

//             {/* Submit */}
//             <button
//               onClick={() => handleSubmit(false)}
//               disabled={
//                 isSubmitting ||
//                 status === "ai-speaking" ||
//                 status === "finished"
//               }
//               className="flex-1 h-14 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
//             >
//               {isSubmitting
//                 ? "Evaluating..."
//                 : currentIndex + 1 === questions.length
//                   ? "Finish Interview"
//                   : "Submit Answer →"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Step2Interview;

// // ...................................................

import React, { useState, useEffect } from "react";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { HiMiniSignal } from "react-icons/hi2";
import axios from "axios";
import maleVideo from "../assets/videos/male-ai.mp4";

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

  // const handleSubmit = async (autoSubmit = false) => {
  //   if (isSubmitting) return;

  //   const finalAnswer = answer.trim();
  //   stopListening();
  //   window.speechSynthesis.cancel();
  //   setTimerActive(false);
  //   setIsSubmitting(true);
  //   setStatus("evaluating");

  //   const transitionMessage = autoSubmit
  //     ? "Time's up! Evaluating your answer."
  //     : "Great answer! Moving to the next question.";

  //   await new Promise((resolve) => {
  //     const utterance = new SpeechSynthesisUtterance(transitionMessage);
  //     utterance.rate = 1;
  //     utterance.onend = resolve;
  //     utterance.onerror = resolve;
  //     window.speechSynthesis.speak(utterance);
  //   });

  //   try {
  //     await axios.post(
  //       serverUrl + "/api/interview/submit-answer",
  //       {
  //         interviewId,
  //         questionIndex: currentIndex,
  //         answer: finalAnswer || "",
  //         timeTaken: currentQuestion.timeLimit,
  //       },
  //       { withCredentials: true }
  //     );

  //     if (currentIndex + 1 < questions.length) {
  //       setTimerKey((prev) => prev + 1);
  //       setCurrentIndex((prev) => prev + 1);
  //       setIsSubmitting(false);
  //     } else {
  //       const doneUtterance = new SpeechSynthesisUtterance(
  //         "Excellent! You have completed all questions. Generating your report now."
  //       );
  //       window.speechSynthesis.speak(doneUtterance);
  //       setStatus("finished");
  //       await handleFinish();
  //     }
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //     setIsSubmitting(false);
  //     setStatus("listening");
  //   }
  // };

  const handleSubmit = async (autoSubmit = false) => {
    if (isSubmitting) return;

    const finalAnswer = answer.trim();
    stopListening();
    window.speechSynthesis.cancel();
    setTimerActive(false);
    setIsSubmitting(true);
    setStatus("evaluating");

    const isLastQuestion = currentIndex + 1 === questions.length;

    // ✅ Last question pe alag message
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

  // const handleFinish = async () => {
  //   try {
  //     const res = await axios.post(
  //       serverUrl + "/api/interview/finish-interview",
  //       { interviewId },
  //       { withCredentials: true },
  //     );
  //     if (onFinish) onFinish(res.data);
  //   } catch (err) {
  //     console.error("Finish error:", err);
  //   }
  // };

  const handleFinish = async () => {
    try {
      const res = await axios.post(
        serverUrl + "/api/interview/finish-interview", // ✅ serverUrl check karo
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-3 sm:p-5 lg:p-8">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[85vh]">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-gray-200 p-5 sm:p-6 flex flex-col">
          {/* AI Video */}
          {/* <div className="overflow-hidden rounded-2xl shadow-md relative">
            <video
              src={maleVideo}
              autoPlay
              loop
              muted
              playsInline
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
          </div> */}
{/* ............................................................................................................................................... */}
          <div className="overflow-hidden rounded-2xl shadow-md relative">
            <video
              src={maleVideo}
              autoPlay={speaking} // ✅ sirf tab play jab AI bol raha ho
              loop
              muted
              playsInline
              ref={(el) => {
                if (el) {
                  speaking ? el.play() : el.pause(); // ✅ speaking pe play, warna pause
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
{/* ............................................................................................................................................... */}

          {/* Status */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-emerald-700">
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
                        : "text-gray-500"
                }`}
              >
                {getStatusText()}
              </p>
            </div>
            <HiMiniSignal
              className={`text-3xl ${speaking ? "text-emerald-500 animate-pulse" : "text-gray-400"}`}
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
          <div className="mt-6 flex justify-between text-sm text-gray-500 font-medium">
            <span>Question {currentIndex + 1}</span>
            <span>{questions.length} Questions</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-5 sm:p-8 flex flex-col">
          {/* Question */}
          <div>
            <p className="text-emerald-600 font-semibold text-sm sm:text-base">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h1 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
              {currentQuestion?.question}
            </h1>
            <span
              className={`mt-2 inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                currentQuestion?.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : currentQuestion?.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
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
              className="w-full h-60 sm:h-72 lg:h-full resize-none rounded-2xl border border-gray-300 p-5 focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Mic */}
            <button
              onClick={handleMicToggle}
              disabled={status !== "listening" || isSubmitting}
              className={`w-full sm:w-14 h-14 rounded-xl sm:rounded-full flex items-center justify-center transition-all
                ${
                  listening
                    ? "bg-red-500 text-white animate-pulse scale-105"
                    : status === "listening"
                      ? "bg-black text-white hover:scale-105"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {listening ? (
                <BsMicFill size={22} />
              ) : (
                <BsMicMuteFill size={22} />
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
              className="flex-1 h-14 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
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
