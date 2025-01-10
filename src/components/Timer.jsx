import { useState, useEffect } from "react";

export default function Timer({ timeLimit, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!timeLimit) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit, onTimeUp]);

  return (
    <div className="text-base md:text-xl font-semibold text-white text-center px-3 md:px-4 py-2 bg-purple-900/30 rounded-lg w-full sm:w-auto">
      Time Left: {timeLeft}s
    </div>
  );
}
