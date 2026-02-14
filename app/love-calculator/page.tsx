"use client";

import { useState } from "react";
import loveScore from "@/algorithms/loveScore";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ✅ ADDED */
import FloatingHearts from "@/app/components/FloatingHearts";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    const percentage = loveScore(name1, name2);
    setResult(percentage);
  };

  const getMessage = (percentage: number): string => {
    if (percentage > 90) return "Made for each other 💖";
    if (percentage > 60) return "Strong Connection 💕";
    return "Keep Trying 😅";
  };

  return (
    <>
      {/* ✅ ADDED FLOATING HEARTS BACKGROUND */}
      <FloatingHearts />

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors mb-6"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-8">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500 mx-auto mb-3 animate-pulse" />
              <h1 className="text-3xl font-serif font-bold text-pink-700">
                Love Compatibility Calculator 💘
              </h1>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter first name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full border border-pink-200 rounded-lg p-3 bg-pink-50 text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="text"
                placeholder="Enter second name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full border border-pink-200 rounded-lg p-3 bg-pink-50 text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <motion.button
                onClick={calculateLove}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold text-lg shadow-lg shadow-pink-300/50 transition-all"
              >
                Calculate Love ❤️
              </motion.button>
            </div>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 text-center"
                >
                  <div className="text-5xl font-serif font-bold text-pink-600 mb-2">
                    {result}%
                  </div>
                  <p className="text-xl text-pink-700">
                    {getMessage(result)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <hr className="my-8 border-pink-200" />

            <div className="text-left space-y-3">
              <h2 className="text-xl font-serif font-bold text-pink-700">
                How This Love Algorithm Works 💡
              </h2>

              <p className="text-pink-600">
                This calculator uses a simple algorithm to estimate compatibility
                between two names.
              </p>

              <ul className="list-disc list-inside text-pink-600 space-y-1">
                <li>Both names are combined into one string.</li>
                <li>Each character is converted into its ASCII value.</li>
                <li>All values are summed.</li>
                <li>The total is taken modulo 101 to generate a percentage.</li>
              </ul>

              <p className="text-pink-600">
                <strong className="text-pink-800">
                  Time Complexity:
                </strong>{" "}
                O(n)
              </p>

              <p className="text-pink-600">
                Where{" "}
                <strong className="text-pink-800">n</strong> is the total
                length of both names combined.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveCalculator;
