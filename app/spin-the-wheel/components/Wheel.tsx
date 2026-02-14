"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const actions = [
  "Kiss 💋",
  "Hug 🤗",
  "Compliment 😊",
  "Truth 😏",
  "Dare 🔥",
  "Hold Hands 👫",
  "I Love You ❤️",
  "Forehead Kiss 😘"
];

const segmentAngle = 360 / actions.length;

export default function Wheel() {

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spinWheel = () => {

    if (spinning) return;

    setSpinning(true);

    const randomIndex =
      Math.floor(Math.random() * actions.length);

    const extraRotation =
      360 * 5 + randomIndex * segmentAngle;

    const newRotation = rotation + extraRotation;

    setRotation(newRotation);

    setTimeout(() => {

      const normalized =
        (360 - (newRotation % 360)) % 360;

      const index =
        Math.floor(normalized / segmentAngle);

      setResult(actions[index]);

      setSpinning(false);

    }, 4000);
  };

  return (
    <div className="flex flex-col items-center">

      {/* Pointer */}
      <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-white mb-3 z-10" />

      {/* Wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="relative w-96 h-96 rounded-full border-8 border-white shadow-2xl"
        style={{
          background: `conic-gradient(
            #ec4899 0deg 45deg,
            #f43f5e 45deg 90deg,
            #fb7185 90deg 135deg,
            #f472b6 135deg 180deg,
            #ec4899 180deg 225deg,
            #f43f5e 225deg 270deg,
            #fb7185 270deg 315deg,
            #f472b6 315deg 360deg
          )`
        }}
      >

        {/* Center circle */}
        <div className="absolute w-16 h-16 bg-white rounded-full shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />

        {/* Labels */}
        {actions.map((action, index) => {

          const angle = index * segmentAngle + segmentAngle / 2;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 text-white font-semibold text-sm whitespace-nowrap"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(0, -135px)
                  rotate(-${angle}deg)
                  translate(-50%, -50%)
                `,
                transformOrigin: "center"
              }}
            >
              {action}
            </div>
          );
        })}

      </motion.div>

      {/* Button */}
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-8 bg-white text-pink-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin Wheel"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-6 text-2xl font-bold text-white animate-pulse">
          {result}
        </div>
      )}

    </div>
  );
}
