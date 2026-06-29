import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer({ duration, active, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Duration change hone pe reset
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    // Active nahi hai toh timer nahi chalega
    if (!active) return;

    // Time khatam
    if (timeLeft <= 0) {
      onComplete && onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete && onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, timeLeft]);

  const percentage = (timeLeft / duration) * 100;
  const color =
    percentage > 50 ? "#10b981" : percentage > 25 ? "#f59e0b" : "#ef4444";

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="w-32 h-32">
      <CircularProgressbar
        value={percentage}
        text={`${mins}:${secs}`}
        styles={buildStyles({
          textColor: color,
          pathColor: color,
          trailColor: "#e5e7eb",
          textSize: "20px",
        })}
      />
    </div>
  );
}

export default Timer;