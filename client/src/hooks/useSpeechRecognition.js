// import { useState, useRef } from "react";

// const useSpeechRecognition = () => {
//   const [transcript, setTranscript] = useState("");
//   const [listening, setListening] = useState(false);
//   const recognitionRef = useRef(null);

//   const supported =
//     "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

//   const startListening = () => {
//     if (!supported) return;

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let finalTranscript = "";
//       for (let i = 0; i < event.results.length; i++) {
//         finalTranscript += event.results[i][0].transcript;
//       }
//       setTranscript(finalTranscript);
//     };

//     recognition.onend = () => setListening(false);
//     recognition.onerror = () => setListening(false);

//     recognition.start();
//     setListening(true);
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setListening(false);
//   };

//   const resetTranscript = () => setTranscript("");

//   return {
//     transcript,
//     listening,
//     supported,
//     startListening,
//     stopListening,
//     resetTranscript,
//   };
// };

// export default useSpeechRecognition;




import { useState, useRef } from "react";

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const supported =
    "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  const startListening = () => {
    if (!supported) return;

    // Stop previous recognition if running
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Better for interview apps
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }

      if (finalTranscript.trim()) {
        setTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  return {
    transcript,
    listening,
    supported,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;