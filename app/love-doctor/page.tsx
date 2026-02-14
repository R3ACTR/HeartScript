"use client";

import { useState } from "react";

export default function LoveDoctor() {

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<null | {
  marriageYear: number;
  kids: number;
  breakupChance: number;
  strength: number;
}>(null);

function generatePrediction() {

  if (!name1 || !name2) return;

  const combined = name1 + name2;

  let hash = 0;

  for (let i = 0; i < combined.length; i++) {
    hash += combined.charCodeAt(i);
  }

  const marriageYear = 2026 + (hash % 7);

  const kids = hash % 4;

  const breakupChance = hash % 101;

  const strength = 100 - breakupChance;

  setResult({
    marriageYear,
    kids,
    breakupChance,
    strength
  });

}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 text-white p-6">

      <h1 className="text-4xl font-bold mb-6">
        ❤️ Love Doctor
      </h1>

      <p className="mb-6 text-lg text-center max-w-md">
        Enter both names and let Love Doctor predict your romantic future 🔮
      </p>

      <input
        type="text"
        placeholder="Your Name"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        className="mb-4 p-3 rounded text-black w-64"
      />

      <input
        type="text"
        placeholder="Partner Name"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        className="mb-4 p-3 rounded text-black w-64"
      />

      <button
  onClick={generatePrediction}
  className="bg-white text-pink-600 font-bold px-6 py-3 rounded hover:scale-105 transition"
>
  Predict Future
</button>
{result && (
  <div className="mt-8 bg-white text-pink-600 p-6 rounded-lg shadow-lg text-center">

    <h2 className="text-2xl font-bold mb-4">
      🔮 Love Doctor Prediction
    </h2>

    <p className="mb-2">
      💍 Marriage Year: <strong>{result.marriageYear}</strong>
    </p>

    <p className="mb-2">
      👶 Number of Kids: <strong>{result.kids}</strong>
    </p>

    <p className="mb-2">
      💔 Breakup Chance: <strong>{result.breakupChance}%</strong>
    </p>

    <p className="mb-2">
      ❤️ Relationship Strength: <strong>{result.strength}%</strong>
    </p>

  </div>
)}


    </div>
  );
}
