"use client";

import { useState } from "react";
import { generateCoupleNickname } from "@/algorithms/nicknameGenerator";

export default function NicknameGeneratorPage() {

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  function handleGenerate() {
    const nickname = generateCoupleNickname(name1, name2);
    setResult(nickname);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="max-w-md w-full space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">

        <h1 className="text-2xl font-bold text-center">
          Couple Nickname Generator
        </h1>

        {/* Name 1 */}
        <input
          type="text"
          placeholder="Enter first name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
        />

        {/* Name 2 */}
        <input
          type="text"
          placeholder="Enter second name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          className="w-full p-3 rounded-lg bg-pink-500 hover:bg-pink-600 transition"
        >
          Generate Nickname
        </button>

        {/* Result */}
        {result && (
          <div className="text-center mt-4">

            <p className="text-sm opacity-70">
              Your Couple Nickname
            </p>

            <p className="text-xl font-bold text-pink-400 mt-2">
              {result}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}
