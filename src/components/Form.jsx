import { useState } from "react";

export default function Form({ handleSubmit }) {
  const [cardCount, setCardCount] = useState(6);
  const [useTimer, setUseTimer] = useState(false);
  const [timeLimit, setTimeLimit] = useState(120);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      cardCount,
      timeLimit: useTimer ? timeLimit : 0,
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 md:space-y-6 max-w-sm mx-auto px-4"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="cardCount"
            className="block text-white text-base md:text-lg"
          >
            Number of Card Pairs (4-40):
          </label>
          <input
            type="number"
            id="cardCount"
            min="4"
            max="40"
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            className="w-full px-3 md:px-4 py-2 border border-purple-300 rounded-md 
                     text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
                     bg-white/90 backdrop-blur-sm text-base"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <input
            type="checkbox"
            id="useTimer"
            checked={useTimer}
            onChange={(e) => setUseTimer(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
          />
          <label htmlFor="useTimer" className="text-white text-base md:text-lg">
            Enable Time Limit
          </label>
        </div>

        {useTimer && (
          <div className="space-y-2">
            <label
              htmlFor="timeLimit"
              className="block text-white text-base md:text-lg"
            >
              Time Limit (seconds):
            </label>
            <input
              type="number"
              id="timeLimit"
              min="30"
              max="600"
              step="30"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full px-3 md:px-4 py-2 border border-purple-300 rounded-md
                       text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500
                       bg-white/90 backdrop-blur-sm text-base"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold
                    py-2 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                    shadow-lg hover:shadow-xl text-base md:text-lg"
          aria-label="Start new game"
        >
          Start Game
        </button>
      </div>
    </form>
  );
}
