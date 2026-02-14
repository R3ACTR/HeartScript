"use client";

import { useState } from "react";
import loveScore from "@/algorithms/loveScore";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 overflow-hidden flex flex-col items-center justify-center p-6">
      
      <FloatingHearts />

      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-100 p-8 relative z-10">

          <div className="text-center mb-8">
            <img
              src="/heart.webp"
              alt="heart"
              className="w-14 h-14 mx-auto mb-3 animate-heartbeat drop-shadow-lg"
            />
            <h1 className="text-3xl font-serif font-bold text-pink-700">
              Love Compatibility Calculator
            </h1>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700 placeholder-pink-300"
            />

            <input
              type="text"
              placeholder="Enter your person's name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700 placeholder-pink-300"
            />

            <motion.button
              onClick={calculateLove}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-4 
              bg-gradient-to-r from-pink-300 to-pink-400 
              hover:from-pink-400 hover:to-pink-500 
              text-white rounded-2xl font-bold 
              shadow-lg hover:shadow-xl hover:shadow-pink-200/50 
              transform transition-all duration-300 
              hover:-translate-y-0.5 active:scale-[0.98] 
              flex items-center justify-center gap-2 group"
            >
              <span className="tracking-wide">Calculate Love</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
              <strong className="text-pink-800">Time Complexity:</strong> O(n)
            </p>

            <p className="text-pink-600">
              Where <strong className="text-pink-800">n</strong> is the total
              length of both names combined.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoveCalculator;
