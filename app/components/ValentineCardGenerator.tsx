"use client";

import { useState, useEffect } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, Heart, ArrowLeft, Send, Copy, Check } from "lucide-react";

/* ---------------- LOVE QUOTES ---------------- */
const loveQuotes: string[] = [
  "You are my today and all of my tomorrows ❤️",
  "Every love story is beautiful, but ours is my favorite 💕",
  "You make my heart smile 😊",
  "With you, every moment is magical ✨",
  "I fall for you more and more every day 💖",
  "You are the best thing that ever happened to me 💘"
];

const MESSAGE_LIMIT = 200;

export default function ValentineCardGenerator() {
  /* ---------------- STATES ---------------- */
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [font, setFont] = useState("serif");

  const [error, setError] = useState<string | null>(null);

  const [stickers, setStickers] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showSocialCopied, setShowSocialCopied] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showMsgCopied, setShowMsgCopied] = useState(false);

  /* ---------------- AUDIO ---------------- */
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const stickerOptions = ["❤️", "🌹", "⭐", "💖", "💘", "✨", "🎀", "💐"];

  /* ---------------- LOAD DRAFT ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("cardDraft");
    if (!saved) return;
    const d = JSON.parse(saved);

    setRecipient(d.recipient ?? "");
    setMessage(d.message ?? "");
    setTheme(d.theme ?? "romantic");
    setAlignment(d.alignment ?? "center");
    setFont(d.font ?? "serif");
    setStickers(d.stickers ?? []);
    setAudioURL(d.audioURL ?? null);
  }, []);

  /* ---------------- AUTO SAVE ---------------- */
  useEffect(() => {
    const draft = { recipient, message, theme, alignment, font, stickers, audioURL };
    localStorage.setItem("cardDraft", JSON.stringify(draft));
  }, [recipient, message, theme, alignment, font, stickers, audioURL]);

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

  /* ---------------- RESET ---------------- */
  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
    setStickers([]);
    setAudioURL(null);
    setError(null);
    localStorage.removeItem("cardDraft");
  };

  /* ---------------- RANDOM QUOTE ---------------- */
  const generateRandomQuote = () => {
    const i = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[i]);
    setError(null);
  };

  /* ---------------- COPY MESSAGE ---------------- */
  const handleCopyMessage = async () => {
    if (!message.trim()) return;
    await navigator.clipboard.writeText(message);
    setShowMsgCopied(true);
    setTimeout(() => setShowMsgCopied(false), 2000);
  };

  /* ---------------- STICKERS ---------------- */
  const addSticker = (emoji: string) => {
    setStickers(p => [...p, { id: Date.now(), x: 120, y: 120, emoji }]);
  };

  const moveSticker = (id: number, x: number, y: number) => {
    setStickers(p => p.map(s => (s.id === id ? { ...s, x, y } : s)));
  };

  /* ---------------- AUDIO ---------------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch {
      alert("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">

      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full">

          <div className="flex flex-col gap-6">

            <button onClick={generateRandomQuote} className="px-4 py-2 bg-[#800020] text-white rounded">
              💌 Generate Random Love Quote
            </button>

            <input
              value={recipient}
              onChange={e => {
                setRecipient(e.target.value);
                setError(null);
              }}
              placeholder="Enter recipient's name"
              className="px-4 py-4 border rounded"
            />

            <textarea
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                setError(null);
              }}
              rows={5}
              placeholder="Write your heartfelt message here…"
              className="px-4 py-4 border-2 rounded-lg resize-none"
            />

            <p className={`text-sm ${message.length > MESSAGE_LIMIT ? "text-red-500" : "text-gray-500"}`}>
              {message.length} / {MESSAGE_LIMIT} characters
            </p>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={handleCopyMessage}
              className="flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition"
            >
              {showMsgCopied ? <Check size={18} /> : <Copy size={18} />}
              {showMsgCopied ? "Copied!" : "Copy Message"}
            </button>

            <div className="flex gap-4">
              <button onClick={handleReset} className="flex-1 border py-3 rounded">
                Reset
              </button>

              <button
                onClick={() => validateStepOne() && setStep(2)}
                className="flex-1 bg-[#800020] text-white py-3 rounded"
              >
                Continue →
              </button>
            </div>
          </div>

          <CardPreview {...{ recipient, message, theme, alignment, font, stickers, moveSticker }} />
        </div>
      )}
    </main>
  );
}

function Step({ number, label, active }: { number: number; label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
        ${active ? "bg-[#800020] text-white" : "bg-white border text-gray-500"}`}
      >
        {number}
      </div>
      <span className={active ? "text-[#800020]" : "text-gray-500"}>{label}</span>
    </div>
  );
}
