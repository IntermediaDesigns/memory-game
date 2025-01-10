import { useState, useEffect } from "react";
import Form from "./Form";
import MemoryCard from "./MemoryCard";
import Timer from "./Timer";
import "../styles/globals.css";

export default function Game() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [beatRecord, setBeatRecord] = useState(false);

  async function startGame({ cardCount, timeLimit }) {
    try {
      const response = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      const dataSample = data.slice(0, cardCount);

      setEmojisData(dataSample);
      setTimeLimit(timeLimit);
      setIsGameOn(true);
      setScore(0);
      setMoves(0);
      setFlippedCards([]);
      setMatchedPairs([]);
      setGameOver(false);
      setTimerStarted(false);
      setCompletionTime(0);
      setStartTime(null);
      setBeatRecord(false);
    } catch (err) {
      console.error(err);
    }
  }

  function handleCardClick(card) {
    if (flippedCards.length === 2 || gameOver) return;

    // Start timer on first card click
    if (!timerStarted) {
      setTimerStarted(true);
      setStartTime(Date.now());
    }

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      setTimeout(() => {
        const [firstCard, secondCard] = newFlippedCards;
        if (firstCard.htmlCode === secondCard.htmlCode) {
          const newMatchedPairs = [...matchedPairs, firstCard.htmlCode];
          setMatchedPairs(newMatchedPairs);
          setScore((prev) => prev + 100);

          // Check if game is complete
          if (newMatchedPairs.length === emojisData.length) {
            const endTime = Date.now();
            const timeTaken = Math.floor((endTime - startTime) / 1000);
            setCompletionTime(timeTaken);

            // Check if we beat previous records
            const newBeatRecord =
              score + 100 > bestScore ||
              bestTime === null ||
              timeTaken < bestTime;

            if (newBeatRecord) {
              setBestScore(Math.max(score + 100, bestScore));
              setBestTime(
                bestTime === null ? timeTaken : Math.min(timeTaken, bestTime)
              );
              setBeatRecord(true);
            }

            setGameOver(true);
          }
        } else {
          setScore((prev) => Math.max(0, prev - 10));
        }
        setFlippedCards([]);
      }, 1000);
    }
  }

  function handleTimeUp() {
    setGameOver(true);
    if (startTime) {
      setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
    }
  }

  const calculateFinalScore = () => {
    const timeBonus = timeLimit
      ? Math.floor(timeLimit * 10 * (matchedPairs.length / emojisData.length))
      : 0;
    return score + timeBonus;
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 text-white">
        Memory Game
      </h1>

      {!isGameOn && (
        <div className="space-y-4 px-4">
          {bestScore > 0 && (
            <div className="text-center text-white mb-4 space-y-2">
              <p className="text-lg md:text-xl">
                Best Score: <span className="font-bold">{bestScore}</span>
              </p>
              {bestTime && (
                <p className="text-lg md:text-xl">
                  Best Time: <span className="font-bold">{bestTime}</span>{" "}
                  seconds
                </p>
              )}
            </div>
          )}
          <Form handleSubmit={startGame} />
        </div>
      )}

      {isGameOn && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <div className="text-white space-y-1 text-center sm:text-left">
              <p className="text-base md:text-lg">
                Score: <span className="font-bold">{score}</span>
              </p>
              <p className="text-base md:text-lg">
                Moves: <span className="font-bold">{moves}</span>
              </p>
            </div>
            {timerStarted && (
              <Timer timeLimit={timeLimit} onTimeUp={handleTimeUp} />
            )}
          </div>

          {gameOver ? (
            <div className="text-center text-white space-y-4 p-4 md:p-6 bg-purple-900/30 rounded-lg mx-4">
              <h2 className="text-xl md:text-2xl font-bold">Game Over!</h2>
              <p className="text-lg md:text-xl">
                Final Score:{" "}
                <span className="font-bold">{calculateFinalScore()}</span>
              </p>
              <p className="text-lg md:text-xl">
                Time Taken: <span className="font-bold">{completionTime}</span>{" "}
                seconds
              </p>
              {beatRecord && (
                <p className="text-lg md:text-xl text-green-400 font-bold record-pulse">
                  🎉 New Record! You beat your previous best! 🎉
                </p>
              )}
              <button
                onClick={() => setIsGameOn(false)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg
                          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                          text-sm md:text-base"
              >
                Play Again
              </button>
            </div>
          ) : (
            <MemoryCard data={emojisData} handleClick={handleCardClick} />
          )}
        </div>
      )}
    </div>
  );
}
