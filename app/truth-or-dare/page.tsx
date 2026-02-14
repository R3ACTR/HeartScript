"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "../algorithms/flames/FloatingHearts";
import { Heart, Flame, Sparkles } from "lucide-react";

export default function TruthOrDarePage() {

  const truthData = {
    Romantic: [
      "What was your first impression of me?",
      "What is your favorite memory with me?",
      "What makes you feel most loved?",
      "When did you realize you liked me?",
      "What do you love most about me?",
      "What is your dream date with me?",
      "When did you feel closest to me?",
      "What song reminds you of us?",
      "What do you imagine our future like?",
      "What makes our relationship special?"
    ],
    Fun: [
      "What is your weirdest habit?",
      "What is your funniest memory?",
      "What cartoon character are you like?",
      "What is your hidden talent?",
      "What is your guilty pleasure?",
      "What is your funniest childhood story?",
      "What food could you eat forever?",
      "What is your dream vacation?",
      "What makes you laugh instantly?",
      "What is your weird food combo?"
    ],
    Spicy: [
      "What is your biggest turn-on?",
      "Have you ever had a crush on my friend?",
      "What is your wildest fantasy?",
      "Have you ever lied to impress someone?",
      "What is something naughty you’ve thought about?",
      "Have you ever stalked someone online?",
      "What is your secret attraction?",
      "What is your boldest move in love?",
      "Have you ever sent a risky text?",
      "What is your hidden desire?"
    ]
  };

  const dareData = {
    Romantic: [
      "Say something romantic.",
      "Send me a love message.",
      "Call me and say you miss me.",
      "Write a short love poem.",
      "Send me 5 heart emojis.",
      "Send me a romantic song.",
      "Tell me why you love me.",
      "Send me your cutest selfie.",
      "Write me a sweet message.",
      "Send me a voice note saying I love you."
    ],
    Fun: [
      "Do a silly dance.",
      "Send a funny selfie.",
      "Sing a random song.",
      "Say tongue twister fast.",
      "Make a funny face selfie.",
      "Dance for 10 seconds.",
      "Send me a meme.",
      "Act like a cartoon character.",
      "Send a voice note laughing.",
      "Make a funny video."
    ],
    Spicy: [
      "Send a flirty text.",
      "Tell me your secret crush story.",
      "Send a bold selfie.",
      "Say something seductive.",
      "Send a spicy emoji combo.",
      "Whisper something naughty.",
      "Send a risky compliment.",
      "Say your biggest turn-on.",
      "Send a teasing voice note.",
      "Describe your dream romantic night."
    ]
  };

  const [mode, setMode] = useState<"truth" | "dare" | null>(null);
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState<"Romantic" | "Fun" | "Spicy">("Romantic");

  function getTruth() {
    const list = truthData[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setMode("truth");
    setPrompt(random);
  }

  function getDare() {
    const list = dareData[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setMode("dare");
    setPrompt(random);
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 overflow-hidden flex items-center justify-center p-6 text-slate-800">
      
      <FloatingHearts />

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-pink-100 relative z-10">

        
        <div className="text-center mb-8">
          <img
            src="/heart.webp"
            alt="heart"
            className="w-14 h-14 mx-auto mb-3 animate-heartbeat drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-[#F57799]">
            Truth or Dare
          </h1>
          <p className="text-pink-400 mt-1">
            Playful questions for couples
          </p>
        </div>

       
        <div className="flex justify-center gap-3 mb-6">
          {["Romantic", "Fun", "Spicy"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                cat === category
                  ? "bg-pink-300 text-white shadow-md"
                  : "bg-pink-50 text-pink-300 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="flex gap-4 mb-8">
          <motion.button
            onClick={getTruth}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white" />
            Truth
          </motion.button>

          <motion.button
            onClick={getDare}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5" />
            Dare
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {prompt && (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-pink-50 border border-pink-100 p-6 rounded-2xl shadow-md text-center"
            >
              <div className="mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white text-pink-600 shadow-sm flex items-center justify-center gap-1">
                  <Sparkles size={12} />
                  {category}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2 text-pink-700 flex items-center justify-center gap-2">
                {mode === "truth" ? (
                  <>
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-400" />
                    Truth
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5 text-pink-500" />
                    Dare
                  </>
                )}
              </h2>

              <p className="text-gray-700">{prompt}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
