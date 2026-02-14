"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";

const romanticFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function LoversBoardPage() {

  const [confession, setConfession] = useState("");
  const [confessions, setConfessions] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("lovers-board-confessions");
    if (saved) setConfessions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lovers-board-confessions",
      JSON.stringify(confessions)
    );
  }, [confessions]);

  const handlePost = () => {
    if (!confession.trim()) return;
    setConfessions([confession, ...confessions]);
    setConfession("");
  };

  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

  return (
    <main className="min-h-screen flex justify-center items-start p-10 bg-gradient-to-br from-rose-200 via-pink-200 to-amber-100">

      {/* Cork board */}
      <div
        className="w-full max-w-5xl border-[12px] border-[#3e2415] rounded-xl shadow-2xl p-8"
        style={{
          backgroundColor: "#6b3e26",
          backgroundImage:
            "radial-gradient(#5a3220 1px, transparent 1px), radial-gradient(#5a3220 1px, transparent 1px)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      >

        <h1 className={`text-center text-5xl text-rose-100 mb-8 ${romanticFont.className}`}>
          Lover's Board 💕
        </h1>

        {/* Write paper */}
        <div
          className="w-[260px] min-h-[180px] mx-auto mb-10 p-4 shadow-xl relative"
          style={{
            background: "#fff6e8",
            boxShadow:
              "inset 0 0 10px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.3)",
          }}
        >

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">
            ❤️
          </div>

          <textarea
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
            placeholder="Write your love confession..."
            className={`w-full h-[100px] bg-transparent outline-none resize-none text-[#4b2e1e] ${romanticFont.className}`}
          />

          <button
            onClick={handlePost}
            className={`mt-3 bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded shadow ${romanticFont.className}`}
          >
            Pin 💌
          </button>

        </div>

        {/* Confession papers */}
        <div className="flex flex-wrap gap-6 justify-center">

          {confessions.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: -120, rotate: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`w-[220px] min-h-[300px] p-4 relative shadow-xl ${rotations[index % rotations.length]}`}
              style={{
                background: "#fff6e8",
                boxShadow:
                  "inset 0 0 15px rgba(120,60,20,0.3), 0 10px 25px rgba(0,0,0,0.4)",
              }}
            >

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">
                ❤️
              </div>

              <div className={`pt-4 whitespace-pre-wrap text-[#4b2e1e] ${romanticFont.className}`}>
                {item}
              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </main>
  );
}
