"use client";
import { useState } from "react";
import loveScore from "@/algorithms/loveScore";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const calculateLove = () => {
    const percentage = loveScore(name1, name2);
    setResult(percentage);
  };

  const getMessage = (percentage) => {
    if (percentage > 90) return "Made for each other 💖";
    if (percentage > 60) return "Strong Connection 💕";
    return "Keep Trying 😅";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-red-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">
          Love Compatibility Calculator 💘
        </h1>

        <input
          type="text"
          placeholder="Enter first name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <input
          type="text"
          placeholder="Enter second name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <button
          onClick={calculateLove}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Calculate Love ❤️
        </button>

        {result !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              {result}% Compatible
            </h2>
            <p className="mt-2">{getMessage(result)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
