"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LoveDoctor() {

  const [name1, setName1] = useState("");
const [name2, setName2] = useState("");

const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<null | {
  marriageYear: number;
  kids: number;
  breakupChance: number;
  strength: number;
}>(null);

function generatePrediction() {

  if (!name1 || !name2) return;

  setLoading(true);
  setResult(null);

  setTimeout(() => {

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

    setLoading(false);

  }, 2000);

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
  disabled={loading}
  className="bg-white text-pink-600 font-bold px-6 py-3 rounded hover:scale-105 transition disabled:opacity-50"
>
  {loading ? "Analyzing..." : "Predict Future"}
</button>

{loading && (
  <div className="mt-8 text-center">
    <p className="text-xl font-bold animate-pulse">
      🔮 Love Doctor is analyzing your future...
    </p>
  </div>
)}


{result && (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="mt-8 bg-white text-pink-600 p-6 rounded-lg shadow-lg text-center"
  >


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

  </motion.div>
)}


    </div>
  );
}
