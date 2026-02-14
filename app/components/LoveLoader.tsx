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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-red-100 text-center px-6">
      <div className="text-6xl text-red-500 animate-bounce">
        ❤️
      </div>

      <p className="mt-6 text-xl font-semibold text-gray-700 animate-pulse">
        Calculating your love destiny...
      </p>

      <div className="w-64 bg-white rounded-full h-4 mt-6 overflow-hidden shadow">
        <div
          className="bg-red-500 h-4 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-gray-600">{progress}%</p>

      <p className="mt-6 text-md italic text-gray-600 max-w-md">
        "{quote}"
      </p>
    </div>
  );
}
