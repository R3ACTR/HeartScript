"use client";
import { useState } from "react";
import loveScore from "@/algorithms/loveScore";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const sanitize = (value) =>
    value.trim().toLowerCase().replace(/[^a-z]/g, "");

  const calculateLove = () => {
    const clean1 = sanitize(name1);
    const clean2 = sanitize(name2);

    if (!clean1 || !clean2) {
      setError("Please enter valid names (letters only).");
      setResult(null);
      return;
    }

    setError("");
    const percentage = loveScore(clean1, clean2);
    setResult(percentage);
  };

  const getMessage = (percentage) => {
    if (percentage >= 95) return "Soulmates 💍";
    if (percentage >= 85) return "Destined Together 💖";
    if (percentage >= 70) return "Strong Connection 💕";
    if (percentage >= 50) return "There’s Potential 🙂";
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
          disabled={!name1 || !name2}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:bg-gray-400 transition"
        >
          Calculate Love ❤️
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-sm">{error}</p>
        )}

        {result !== null && !error && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              {result}% Compatible
            </h2>
            <p className="mt-2 text-lg">{getMessage(result)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
