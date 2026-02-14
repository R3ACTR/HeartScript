"use client";

import { Heart, Search, Music2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FloatingHearts from "./algorithms/flames/FloatingHearts";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const algorithms = [
    { id: "love-calculator", title: "Love Calculator", description: "Calculate love compatibility", color: "from-[#F875AA] to-[#FF8FB7]", path: "/love-calculator" },
    { id: "flames", title: "FLAMES Game", description: "Classic relationship game", color: "from-[#F875AA] to-[#FF8FB7]", path: "/algorithms/flames" },
    { id: "nickname-generator", title: "Couple Nickname", description: "Generate cute nicknames", color: "from-[#F875AA] to-[#FF8FB7]", path: "/nickname-generator" },
    { id: "card-creator", title: "Valentine Card", description: "Create personalized cards", color: "from-[#F875AA] to-[#FF8FB7]", path: "/create" },
    { id: "Marry", title: "Meet2Marry Date", description: "Predict your marriage date", color: "from-[#F875AA] to-[#FF8FB7]", path: "/marry" },
    { id: "truth-or-dare", title: "Truth or Dare", description: "Romantic challenges", color: "from-[#F875AA] to-[#FF8FB7]", path: "/truth-or-dare" },
    { id: "drake-equation", title: "Drake Equation", description: "Find potential soulmates", color: "from-[#F875AA] to-[#FF8FB7]", path: "/drake-equation" },
    { id: "love-quiz", title: "Love Quiz", description: "Test compatibility", color: "from-[#F875AA] to-[#FF8FB7]", path: "/love-quiz" },
    { id: "spin-the-wheel", title: "Spin the Wheel", description: "Romantic actions spinner", color: "from-[#F875AA] to-[#FF8FB7]", path: "/spin-the-wheel" },
    { id: "love-doctor", title: "Love Doctor", description: "Relationship advice", color: "from-[#F875AA] to-[#FF8FB7]", path: "/love-doctor" },
    { id: "pickup-lines", title: "Pickup Lines", description: "Fun romantic lines", color: "from-[#F875AA] to-[#FF8FB7]", path: "/pickup-lines" },
    { id: "lovers-board", title: "Lovers Board", description: "Anonymous confessions", color: "from-[#F875AA] to-[#FF8FB7]", path: "/lovers-board" },
    { id: "catch-the-heart", title: "Catch the Heart", description: "Catch falling hearts game", color: "from-[#F875AA] to-[#FF8FB7]", path: "/catch-the-heart" }
  ];

  const iconMap = {
    "love-calculator": "/calc.webp",
    "flames": "/flames.webp",
    "nickname-generator": "/nickname.webp",
    "card-creator": "/val-card.webp",
    "Marry": "/marry.webp",
    "truth-or-dare": "/truth-dare.webp",
    "drake-equation": "/equation.webp",
    "love-quiz": "/quiz.webp",
    "spin-the-wheel": "/wheel.webp",
    "love-doctor": "/doctor.webp",
    "pickup-lines": "/pickup.webp",
    "lovers-board": "/board.webp",
    "catch-the-heart": "/heart.webp"
  };

  const filteredAlgorithms = algorithms.filter(algo =>
    algo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    algo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg"
      >
        {isPlaying ? <Music2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
      </motion.button>

      <FloatingHearts />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F075AE]">Love Algorithms</h1>
          <p className="text-xl text-[#EE6983] max-w-2xl mx-auto mt-4">Explore our collection of romantic tools</p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredAlgorithms.map((algo, index) => (
            <motion.div key={algo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} onClick={() => router.push(algo.path)} className="group cursor-pointer">
              <div className="relative h-full rounded-2xl shadow-lg hover:bg-[#FFE4EF] hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50">
                <div className={`absolute inset-0 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10`} />
                <div className="relative p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform">
                    <img src={iconMap[algo.id] || "/heart.webp"} alt={algo.title} className="w-20 h-20 object-contain drop-shadow-md" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F75270] mb-3">{algo.title}</h3>
                  <p className="text-[#E45A92] mb-6">{algo.description}</p>
                  <div className="flex items-center text-[#E45A92] font-semibold gap-2">
                    <span>Try it now</span>
                    <span>→</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-10">
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
