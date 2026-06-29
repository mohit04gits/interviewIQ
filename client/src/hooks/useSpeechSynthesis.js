// hooks/useSpeechSynthesis.js
import { useState, useEffect, useRef } from "react";

const useSpeechSynthesis = () => {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text, onEnd) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Best voice select karo
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Google US English") || v.lang === "en-US"
    );
    if (preferred) utterance.voice = preferred;

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
      if (onEnd) onEnd(); // error pe bhi timer start ho
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speaking, speak, stop };
};

export default useSpeechSynthesis;