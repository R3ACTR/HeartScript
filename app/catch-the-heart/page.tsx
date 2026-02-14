"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

type HeartType = {
  id: number;
  x: number;
  y: number;
  speed: number;
  variant: "normal" | "golden" | "broken";
};

export default function CatchTheHeartPage() {

  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });


  // SPAWN HEARTS
  useEffect(() => {

    if (!gameRunning) return;

    const interval = setInterval(() => {

      const randomX = Math.random() * 90;
      const randomVariant = Math.random();

      let variant: "normal" | "golden" | "broken" = "normal";

      if (randomVariant < 0.1)
        variant = "golden";
      else if (randomVariant < 0.2)
        variant = "broken";

      const newHeart: HeartType = {
        id: Date.now() + Math.random(),
        x: randomX,
        y: -10,
        speed: 1.5 + Math.random() * 2.5,
        variant
      };

      setHearts(prev => [...prev, newHeart]);

    }, 800);

    return () => clearInterval(interval);

  }, [gameRunning]);


  // MOVE HEARTS DOWN
  useEffect(() => {

    if (!gameRunning) return;

    const interval = setInterval(() => {

      setHearts(prev =>
        prev
          .map(heart => ({
            ...heart,
            y: heart.y + heart.speed
          }))
          .filter(heart => heart.y < 110)
      );

    }, 50);

    return () => clearInterval(interval);

  }, [gameRunning]);


  // COLLISION DETECTION WITH CURSOR
  useEffect(() => {

    if (!gameRunning) return;

    setHearts(prevHearts => {

      const remainingHearts: HeartType[] = [];

      prevHearts.forEach(heart => {

        const dx = heart.x - cursor.x;
        const dy = heart.y - cursor.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const collisionDistance = 7;

        if (distance < collisionDistance) {

          if (heart.variant === "normal")
            setScore(prev => prev + 1);

          else if (heart.variant === "golden")
            setScore(prev => prev + 5);

          else if (heart.variant === "broken")
            setScore(prev => Math.max(0, prev - 3));

        } else {

          remainingHearts.push(heart);

        }

      });

      return remainingHearts;

    });

  }, [cursor, gameRunning]);


  const startGame = () => {
    setScore(0);
    setHearts([]);
    setGameRunning(true);
  };

  const stopGame = () => {
    setGameRunning(false);
    setHearts([]);
  };


  return (
    <div className="min-h-screen py-12 px-4 select-none">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-rose-500" />

            <h1 className="text-4xl md:text-5xl font-display text-rose-600">
              Catch the Heart
            </h1>

            <Sparkles className="w-8 h-8 text-rose-500" />
          </div>

          <p className="text-rose-400 text-lg">
            Move your cursor and catch hearts!
          </p>
        </motion.div>


        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <p className="text-2xl font-bold text-rose-600">
            Score: {score}
          </p>
        </motion.div>


        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          id="game-area"
          className="
            relative
            w-full
            h-[500px]
            bg-white/70
            backdrop-blur-sm
            rounded-3xl
            shadow-xl
            border border-rose-200
            overflow-hidden
          "
          onMouseMove={(e) => {

            const rect = e.currentTarget.getBoundingClientRect();

            const x =
              ((e.clientX - rect.left) / rect.width) * 100;

            const y =
              ((e.clientY - rect.top) / rect.height) * 100;

            setCursor({ x, y });

          }}
        >

          {/* Start message */}
          {!gameRunning && (
            <div className="absolute inset-0 flex items-center justify-center text-rose-400 text-lg">
              Click Start Game 💕
            </div>
          )}


          {/* Hearts */}
          {hearts.map((heart) => {

            let color = "text-rose-500";

            if (heart.variant === "golden")
              color = "text-yellow-400";

            if (heart.variant === "broken")
              color = "text-gray-400";

            return (
              <motion.div
                key={heart.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`
                }}
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity
                }}
              >
                <Heart
                  className={`w-8 h-8 fill-current ${color}`}
                />
              </motion.div>
            );

          })}

        </motion.div>


        {/* Controls */}
        <div className="flex justify-center mt-6">

          {!gameRunning ? (

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="
                flex items-center gap-2
                px-8 py-4
                rounded-full
                text-white
                font-semibold
                bg-gradient-to-r from-rose-500 to-pink-500
                shadow-lg
              "
            >
              <RefreshCw className="w-5 h-5" />
              Start Game
            </motion.button>

          ) : (

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopGame}
              className="
                px-8 py-4
                rounded-full
                text-white
                font-semibold
                bg-gray-500
              "
            >
              Stop Game
            </motion.button>

          )}

        </div>

      </div>

    </div>
  );
}
