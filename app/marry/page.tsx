"use client";

import { useState } from "react";
import { generateMDate } from "@/algorithms/marriageEstimator";

export default function DestinedMarryPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");
  const [result, setResult] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  //ensure age ≥ 15
  const minBirthday = new Date();
  minBirthday.setFullYear(minBirthday.getFullYear() - 100); // allow max age 100
  const minBirthdayStr = minBirthday.toISOString().split("T")[0];

  function handleEstimate() {
    const now = new Date();
    const b1 = new Date(date1);
    const b2 = new Date(date2);
    const meet = new Date(date3);
    const fight = new Date(date4);

    // Basic validations
    if (!date1 || !date2 || !date3 || !date4) {
      setResult("Please fill in all dates.");
      return;
    }

    // Birthdays must be at least 15 years ago
    const minAllowed = new Date();
    minAllowed.setFullYear(minAllowed.getFullYear() - 15);
    if (b1 > minAllowed || b2 > minAllowed) {
      setResult("Both birthdays must be at least 15 years ago.");
      return;
    }

    // No date in future
    if (b1 > now || b2 > now || meet > now || fight > now) {
      setResult("Dates cannot be in the future.");
      return;
    }

    const estDate = generateMDate(date1, date2, date3, date4);
    setResult(estDate || "Invalid Input");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">

        <h1 className="text-2xl font-bold text-center">
          Find your{" "}
          <span className="text-red-500 font-normal italic font-serif">
            Destined
          </span>{" "}
          Marriage Date
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Date 1 */}
          <div>
            <p className="text-sm mb-1">Your Birthday</p>
            <input
              type="date"
              value={date1}
              max={todayStr}
              min={minBirthdayStr}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
            />
          </div>

          {/* Date 2 */}
          <div>
            <p className="text-sm mb-1">Partner's Birthday</p>
            <input
              type="date"
              value={date2}
              max={todayStr}
              min={minBirthdayStr}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
            />
          </div>

          {/* Date 3 */}
          <div>
            <p className="text-sm mb-1">Day You Met</p>
            <input
              type="date"
              value={date3}
              max={todayStr}
              onChange={(e) => setDate3(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
            />
          </div>

          {/* Date 4 */}
          <div>
            <p className="text-sm mb-1">First Fight</p>
            <input
              type="date"
              value={date4}
              max={todayStr}
              onChange={(e) => setDate4(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleEstimate}
          className="w-full p-3 rounded-lg bg-pink-500 hover:bg-pink-600 transition"
        >
          Find Out
        </button>

        {/* Result with Heart Animation */}
        {result && (
          <div className="text-center mt-6 relative">
            <p className="text-sm opacity-70">
              This relationship grows naturally toward marriage...
            </p>

            <p className="text-xl font-bold text-pink-400 mt-2 animate-popHeart">
              {result}
            </p>

            {/* Heart popping effect */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`absolute text-pink-400 text-2xl animate-heartPop delay-${i * 200}`}
                  style={{
                    left: `${20 + i * 15}%`,
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes popHeart {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1) translateY(-40px); opacity: 0; }
        }

        .animate-heartPop {
          animation: popHeart 1s ease forwards;
        }

        .animate-popHeart {
          animation: popHeart 1s ease;
        }

        .delay-0 { animation-delay: 0s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>
    </div>
  );
}
