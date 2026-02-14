"use client";

import { useState } from "react";
import { generateMDate } from "@/algorithms/marriageEstimator";
import FloatingHearts from "../algorithms/flames/FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DestinedMarryPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");
  const [result, setResult] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const minBirthday = new Date();
  minBirthday.setFullYear(minBirthday.getFullYear() - 100);
  const minBirthdayStr = minBirthday.toISOString().split("T")[0];

  function handleEstimate() {
    const now = new Date();
    const b1 = new Date(date1);
    const b2 = new Date(date2);
    const meet = new Date(date3);
    const fight = new Date(date4);

    if (!date1 || !date2 || !date3 || !date4) {
      setResult("Please fill in all dates.");
      return;
    }

    const minAllowed = new Date();
    minAllowed.setFullYear(minAllowed.getFullYear() - 15);

    if (b1 > minAllowed || b2 > minAllowed) {
      setResult("Both birthdays must be at least 15 years ago.");
      return;
    }

    if (b1 > now || b2 > now || meet > now || fight > now) {
      setResult("Dates cannot be in the future.");
      return;
    }

    const estDate = generateMDate(date1, date2, date3, date4);
    setResult(estDate || "Invalid Input");
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center">
      
      <FloatingHearts />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-pink-100 transition-all duration-300 hover:scale-[1.01] z-10">

        {/* Header */}
        <div className="text-center mb-6">
          <img
            src="/heart.webp"
            alt="heart"
            className="w-14 h-14 mx-auto mb-3 animate-heartbeat drop-shadow-lg"
          />

          <h1 className="text-3xl font-bold text-[#F57799]">
            Destined Marriage Date
          </h1>
          <p className="text-pink-400 mt-1">
            Discover when your paths unite forever
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-sm mb-1 text-pink-500">Your Birthday</p>
            <input
              type="date"
              value={date1}
              max={todayStr}
              min={minBirthdayStr}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700"
            />
          </div>

          <div>
            <p className="text-sm mb-1 text-pink-500">Partner's Birthday</p>
            <input
              type="date"
              value={date2}
              max={todayStr}
              min={minBirthdayStr}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-[#FF8FB7] bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700"
            />
          </div>

          <div>
            <p className="text-sm mb-1 text-pink-500">Day You Met</p>
            <input
              type="date"
              value={date3}
              max={todayStr}
              onChange={(e) => setDate3(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700"
            />
          </div>

          <div>
            <p className="text-sm mb-1 text-pink-500">First Fight</p>
            <input
              type="date"
              value={date4}
              max={todayStr}
              onChange={(e) => setDate4(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Button */}
        <motion.button
          onClick={handleEstimate}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 mt-6 bg-gradient-to-r from-pink-300 to-pink-500 
          hover:from-pink-300 hover:to-pink-500 text-white rounded-2xl font-bold 
          shadow-lg hover:shadow-xl hover:shadow-pink-200/50 
          transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span className="tracking-wide">Find Destiny</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-pink-500">
                This relationship grows naturally toward marriage...
              </p>

              <p className="text-3xl font-bold text-pink-600 mt-2 drop-shadow-sm">
                {result}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
    </div>
  );
}
