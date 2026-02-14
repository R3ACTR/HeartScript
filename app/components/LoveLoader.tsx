"use client";
import { useEffect, useState } from "react";

const quotes = [
  "Love is composed of a single soul inhabiting two bodies.",
  "Every love story is beautiful, but yours is my favorite.",
  "Where there is love, there is life.",
  "Love recognizes no barriers.",
  "You + Me = Destiny ❤️"
];

export default function LoveLoader() {
  const [quote, setQuote] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FF8FB7] via-white to-[#F6B1CE] text-center px-6">
      
      {/* Heart image instead of emoji */}
      <img
        src="/heart.webp"
        alt="heart"
        className="w-20 h-20 animate-bounce drop-shadow-lg"
      />

      <p className="mt-6 text-xl font-semibold text-[#F57799] animate-pulse">
        Calculating your love destiny...
      </p>

      {/* Progress bar */}
      <div className="w-64 bg-white rounded-full h-4 mt-6 overflow-hidden shadow">
        <div
          className="bg-gradient-to-r from-pink-300 to-pink-500 h-4 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-pink-500">{progress}%</p>

      {/* Quote */}
      <p className="mt-6 text-md italic text-pink-500 max-w-md">
        "{quote}"
      </p>
    </div>
  );
}
