"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";

/* ---------------- LOVE QUOTES ---------------- */
const loveQuotes: string[] = [
  "You are my today and all of my tomorrows ❤️",
  "Every love story is beautiful, but ours is my favorite 💕",
  "You make my heart smile 😊",
  "With you, every moment is magical ✨",
  "I fall for you more and more every day 💖",
  "You are the best thing that ever happened to me 💘",
];

const MESSAGE_LIMIT = 200;

export default function ValentineCardGenerator() {
  /* ---------------- STATE ---------------- */
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "center"
  );
  const [font, setFont] = useState("serif");
  const [error, setError] = useState<string | null>(null);

  const [stickers, setStickers] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);

  /* ---------------- VALIDATION ---------------- */
  const validateStepOne = () => {
    if (!recipient.trim()) {
      setError("Please enter the recipient’s name");
      return false;
    }
    if (recipient.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return false;
    }
    if (!message.trim()) {
      setError("Message cannot be empty");
      return false;
    }
    if (message.trim().length < 2) {
      setError("Message must be at least 2 characters long");
      return false;
    }
    setError(null);
    return true;
  };

  /* ---------------- ACTIONS ---------------- */
  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
    setStickers([]);
    setError(null);
  };

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
    setError(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          <div className="flex flex-col gap-6">
            <button
              onClick={generateRandomQuote}
              className="px-4 py-2 bg-[#800020] text-white rounded-lg"
            >
              💌 Generate Love Quote
            </button>

            {/* Recipient */}
            <div>
              <input
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setError(null);
                }}
                placeholder="Enter recipient's name"
                className="px-4 py-4 border rounded w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                This name will appear on the card
              </p>
            </div>

            {/* Message */}
            <div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError(null);
                }}
                rows={5}
                placeholder="Write your heartfelt message here…"
                className="px-4 py-4 border-2 rounded-lg resize-none w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Your message will be shown exactly as written
              </p>
              <p
                className={`text-sm mt-1 ${
                  message.length > MESSAGE_LIMIT
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {message.length} / {MESSAGE_LIMIT} characters
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 border py-3 rounded"
              >
                Reset Card
              </button>
              <button
                onClick={() => validateStepOne() && setStep(2)}
                className="flex-1 bg-[#800020] text-white py-3 rounded"
              >
                Continue →
              </button>
            </div>
          </div>

          <CardPreview
            {...{ recipient, message, theme, alignment, font, stickers }}
          />
        </div>
      )}
    </main>
  );
}
