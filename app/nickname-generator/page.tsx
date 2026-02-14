"use client";

import { useState } from "react";
import { generateCoupleNickname } from "../../algorithms/nicknameGenerator";
import { ArrowRight } from "lucide-react";
import FloatingHearts from "../algorithms/flames/FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";

export default function NicknameGeneratorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    if (!name1.trim() || !name2.trim()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const nickname = generateCoupleNickname(name1, name2);
    setResult(nickname);
    setIsLoading(false);
  }

  return (
    
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center">
      
      <FloatingHearts />

      {/* CONTENT WRAPPER */}
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-10 w-full max-w-[90%] md:max-w-none z-10">
        
        {/* LEFT IMAGE */}
        
        <div className="hidden md:block flex-shrink-0">
          <img
            src="/couple.webp"
            alt="Couple"
            className="h-[60vh] lg:h-[75vh] xl:h-[85vh] w-auto object-contain drop-shadow-2xl translate-y-4"
          />
        </div>

        {/* RIGHT FORM */}
        
        <div className="w-full max-w-md flex-shrink-0 bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-pink-100 transition-all duration-300 hover:scale-[1.01]">

          {/* Header */}
          <div className="text-center mb-6">
            <img
              src="/heart.webp"
              alt="heart"
              className="w-14 h-14 mx-auto mb-3 animate-heartbeat drop-shadow-lg"
            />

            <h1 className="text-3xl font-bold text-[#F57799]">
              Couple Nickname
            </h1>
            <p className="text-pink-400 mt-1">
              Create a cute blended name
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 
              outline-none transition-all text-gray-700 placeholder-pink-300"
            />

            <input
              type="text"
              placeholder="Partner's name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 
              focus:border-pink-400 focus:ring-2 focus:ring-pink-200 
              outline-none transition-all text-gray-700 placeholder-pink-300"
            />

            <motion.button
              onClick={handleGenerate}
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-2 bg-gradient-to-r from-pink-300 to-pink-500 
              hover:from-pink-300 hover:to-pink-500 text-white rounded-2xl font-bold 
              shadow-lg hover:shadow-xl hover:shadow-pink-200/50 
              transition-all duration-300 disabled:opacity-50 
              flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="tracking-wide">Generate Nickname</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-6"
              >
                <p className="text-sm text-pink-500">Your Couple Nickname</p>
                <p className="text-3xl font-bold text-pink-600 mt-2 drop-shadow-sm">
                  {result}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}