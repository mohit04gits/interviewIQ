// // hooks/useSpeechSynthesis.js
// import { useState, useEffect, useRef } from "react";

// const useSpeechSynthesis = () => {
//   const [speaking, setSpeaking] = useState(false);
//   const utteranceRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   const speak = (text, onEnd) => {
//     if (!window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utteranceRef.current = utterance;

//     // Best voice select karo
//     const voices = window.speechSynthesis.getVoices();
//     const preferred = voices.find(
//       (v) => v.name.includes("Google US English") || v.lang === "en-US"
//     );
//     if (preferred) utterance.voice = preferred;

//     utterance.rate = 0.95;
//     utterance.pitch = 1;
//     utterance.volume = 1;

//     utterance.onstart = () => setSpeaking(true);
//     utterance.onend = () => {
//       setSpeaking(false);
//       if (onEnd) onEnd();
//     };
//     utterance.onerror = () => {
//       setSpeaking(false);
//       if (onEnd) onEnd(); // error pe bhi timer start ho
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   const stop = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };

//   return { speaking, speak, stop };
// };

// export default useSpeechSynthesis;









// hooks/useSpeechSynthesis.js

// hooks/useSpeechSynthesis.js

import { useState, useEffect, useRef } from "react";

const useSpeechSynthesis = () => {
  const [speaking, setSpeaking] = useState(false);
  const voicesRef = useRef([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();

    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getPreferredVoice = () => {
    const voices = voicesRef.current;

    if (!voices.length) return null;

    const preferredVoices = [
      "Microsoft David",
      "Microsoft Mark",
      "Microsoft Christopher",
      "Microsoft Guy",
      "Microsoft Roger",
      "Microsoft Ryan",
      "Microsoft Thomas",
      "Microsoft William",
      "Microsoft Liam",
      "Google UK English Male",
      "Google US English",
      "Alex",
      "Daniel",
    ];

    for (const name of preferredVoices) {
      const voice = voices.find((v) => v.name.includes(name));
      if (voice) return voice;
    }

    return (
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0]
    );
  };

  const speak = (text, onEnd) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voice = getPreferredVoice();

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setSpeaking(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return {
    speaking,
    speak,
    stop,
  };
};

export default useSpeechSynthesis;