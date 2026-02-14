"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Option = {
  text: string;
  effect: number;
};

type Question = {
  question: string;
  options: Option[];
};

// Random question generator
function generateQuestion(): Question {

  const scenarios = [
    "Are you busy?",
    "I miss you...",
    "Do you love me?",
    "Why didn't you reply?",
    "Good morning ❤️",
    "Good night ❤️",
    "Let's meet today",
    "Are you ignoring me?",
    "Send me a selfie",
    "Call me when free",
    "You forgot something important",
    "I'm sad...",
    "I'm angry at you",
    "Do you trust me?",
    "Do you care about me?",
    "Where are you?",
    "What are you doing?",
    "Do you think about me?",
    "Are you hiding something?",
    "You changed...",
    "You don't love me like before",
    "Can we talk?",
    "Are you free tonight?",
    "You hurt me",
    "Do I matter to you?"
  ];

  const positive = [
    "For you, always ❤️",
    "I love you ❤️",
    "Of course ❤️",
    "Always for you ❤️",
    "You mean everything ❤️",
    "Yes my love ❤️",
    "Only you ❤️",
    "Forever ❤️"
  ];

  const neutral = [
    "Yes",
    "Ok",
    "Maybe",
    "I guess",
    "Hmm",
    "Later",
    "We'll see",
    "Fine"
  ];

  const negative = [
    "Ignore",
    "Seen",
    "...",
    "No",
    "Stop asking",
    "Busy",
    "Not now",
    "Whatever"
  ];

  const question =
    scenarios[Math.floor(Math.random() * scenarios.length)];

  return {
    question,
    options: [
      {
        text: positive[Math.floor(Math.random() * positive.length)],
        effect: Math.floor(Math.random() * 10) + 10
      },
      {
        text: neutral[Math.floor(Math.random() * neutral.length)],
        effect: Math.floor(Math.random() * 10) - 5
      },
      {
        text: negative[Math.floor(Math.random() * negative.length)],
        effect: -(Math.floor(Math.random() * 15) + 5)
      }
    ]
  };
}


export default function RelationshipSurvivalSimulator() {
  const [health, setHealth] = useState(50);
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");

  function handleChoice(effect: number) {
    if (gameOver) return;

    const newHealth = Math.max(0, Math.min(100, health + effect));
    setHealth(newHealth);

    if (newHealth <= 0) {
      setGameOver(true);
      setResult("💔 Relationship ended");
      return;
    }

    if (newHealth >= 100) {
      setGameOver(true);
      setResult("💍 Perfect relationship!");
      return;
    }

    setQuestion(generateQuestion());
  }

  function restart() {
    setHealth(50);
    setGameOver(false);
    setResult("");
    setQuestion(generateQuestion());
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Relationship Survival Simulator ❤️
      </h1>

      {/* Health bar */}
      <div className="w-full max-w-md mb-6">
        <div className="bg-white/20 rounded-full h-6 overflow-hidden">
          <motion.div
            className="bg-green-400 h-full"
            animate={{ width: `${health}%` }}
          />
        </div>
        <p className="text-center mt-2">Health: {health}</p>
      </div>

      {/* Game Over */}
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">{result}</h2>
          <button
            onClick={restart}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Restart
          </button>
        </div>
      ) : (
        <div className="bg-white/10 p-6 rounded-xl max-w-md w-full">

          <h2 className="text-xl mb-4 text-center">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(opt.effect)}
                className="bg-white text-black px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                {opt.text}
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
