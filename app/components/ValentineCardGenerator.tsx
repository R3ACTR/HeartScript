"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";
import {
  Download,
  FileText,
  Mail,
  MessageCircle,
  Heart,
  ArrowLeft,
  Send,
  Copy,
  Check,
} from "lucide-react";

import { CardDownloadButton } from "../components/CardDownloadButton";

interface Sticker {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

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
  const [alignment, setAlignment] =
    useState<"left" | "center" | "right">("center");
  const [font, setFont] = useState("serif");
  const [error, setError] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 1, x: 40, y: 40, emoji: "💖" },
    { id: 2, x: 220, y: 90, emoji: "💕" },
  ]);

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
    setError(null);
  };

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
    setError(null);
  };
  const handleSurpriseMe = () => {
  const themes = ["romantic", "cute", "classic"];
  const fonts = ["serif", "sans", "mono"];
  const alignments: ("left" | "center" | "right")[] = [
    "left",
    "center",
    "right",
  ];

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  const randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];
  const randomQuote =
    loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

  setTheme(randomTheme);
  setFont(randomFont);
  setAlignment(randomAlignment);
  setMessage(randomQuote);
};


  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const moveSticker = (id: number, x: number, y: number) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          <div className="flex flex-col gap-6">
            <button
              onClick={generateRandomQuote}
              className="px-4 py-2 bg-[#800020] text-white rounded-lg"
            >
              💌 Generate Love Quote
            </button>


            <button
  onClick={handleSurpriseMe}
  className="px-4 py-2 bg-pink-500 text-white rounded-lg transition-all duration-300 hover:bg-pink-600 hover:shadow-md active:scale-95"
>
  🎲 Surprise Me
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

            {/* Emoji picker */}
            <div className="relative">
              <button
                title="Add emoji"
                onClick={() => setShowEmoji(!showEmoji)}
                className="text-2xl"
              >
                😊
              </button>

              {showEmoji && (
                <div className="absolute z-10 bg-white border rounded-lg p-2 shadow grid grid-cols-6 gap-2">
                  {["❤️", "😍", "💕", "💖", "🌹", "✨", "💌"].map((e) => (
                    <button
                      key={e}
                      title={`Insert ${e} emoji`}
                      onClick={() => {
                        setMessage((p) => p + e);
                        setShowEmoji(false);
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
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
            {...{ recipient, message, theme, alignment, font }}
            stickers={stickers}
            moveSticker={moveSticker}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
<div className="w-full max-w-4xl text-center">
  <div className="mb-8">
    <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
      Preview Your Card
    </h2>
    <p className="text-gray-600">
      Here&apos;s how your Valentine card will look
    </p>
  </div>

  <CardPreview
    {...{ recipient, message, theme, alignment, font }}
    stickers={stickers}
    moveSticker={moveSticker}
  />

  {/* Decorative Wax Seal Download */}
  <div className="flex justify-center mt-8 mb-10">
    <CardDownloadButton
      cardElementId="valentine-card-preview"
      cardTitle={`valentine-card-${recipient || "card"}`}
    />
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 border px-6 py-3"
            >
              <ArrowLeft />
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 bg-[#800020] text-white px-6 py-3"
            >
              <Send />
              Send Card
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="text-center max-w-xl">
          <Heart className="mx-auto w-12 h-12 text-[#800020] mb-4 animate-pulse" />

          <h2 className="text-3xl font-bold mb-2">Send Your Card</h2>
          <p className="mb-8 text-gray-600">Choose how to share it</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              disabled={!message.trim()}
              title={!message.trim() ? "Add a message to enable WhatsApp sharing" : ""}
              className="border p-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💬 WhatsApp
            </button>

            <button
              disabled={!message.trim()}
              title={!message.trim() ? "Write a message to share on Twitter" : ""}
              className="border p-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🐦 Twitter (X)
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 border p-6 rounded"
            >
              {showCopied ? <Check /> : <Copy />}
              {showCopied ? "Copied!" : "Copy Share Link"}
            </button>

            <button className="flex items-center gap-2 border p-6 rounded">
              <Mail />
              Email
            </button>

            <button className="flex items-center gap-2 border p-6 rounded">
              <Download />
              PNG
            </button>

            <button className="flex items-center gap-2 border p-6 rounded">
              <FileText />
              PDF
            </button>
          </div>

          <button onClick={() => setStep(2)} className="mt-8 underline">
            ← Back
          </button>
        </div>
      )}
    </main>
  );
}
function Step({
  number,
  label,
  active,
}: {
  number: number;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center
        ${active ? "bg-[#800020] text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {number}
      </div>
      <span
        className={`${
          active ? "text-[#800020] font-bold" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

