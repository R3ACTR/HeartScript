"use client";

import { Heart, Calculator, Flame, MessageCircle, Sparkles, PenTool, Rose, Search, Music2, VolumeX, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FloatingHearts from "./algorithms/flames/FloatingHearts";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {}).then(() => {
        setIsPlaying(true);
      });
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
    {
      id: "love-calculator",
      title: "Love Calculator",
      description: "Calculate the love compatibility between two people using a special algorithm",
      icon: Calculator,
      color: "from-[#F875AA] to-[#FF8FB7]",
      path: "/love-calculator",
    },
    {
      id: "flames",
      title: "FLAMES Game",
      description: "Discover your relationship status with the classic FLAMES algorithm",
      icon: Flame,
      color: "from-[#F875AA] to-[#FF8FB7]",
      path: "/algorithms/flames",
    },
    {
      id: "nickname-generator",
      title: "Couple Nickname",
      description: "Generate cute couple nicknames by combining two names",
      icon: MessageCircle,
      color: "from-[#F875AA] to-[#FF8FB7]",
      path: "/nickname-generator",
    },
    {
      id: "card-creator",
      title: "Valentine Card",
      description: "Create and send beautiful personalized valentine cards",
      icon: PenTool,
      color: "from-[#F875AA] to-[#FF8FB7]",
      path: "/create",
    },
    {
      id: "Marry",
      title: "Meet2Marry Date",
      description: "Discover your destined date to marry based on your Meeting Date",
      icon: Rose,
      color: "from-blue-500 to-red-500",
      path: "/marry",
    },
    {
      id: "truth-or-dare",
      title: "Truth or Dare",
      description: "A Valentine’s twist on Truth or Dare with sweet questions and romantic challenges made to bring you closer. 💘",
      icon: PenTool,
      color: "from-red-500 to-pink-500",
      path: "/truth-or-dare",
    },
    {
      id: "drake-equation",
      title: "Drake Equation",
      description: "Calculate your potential soulmates using Drake Equation",
      icon: Search,
      color: "from-indigo-500 to-purple-500",
      path: "/drake-equation",
    },
    {
      id: "love-quiz",
      title: "Love Quiz",
      description: "Answer romantic questions and discover your love compatibility score 💕",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      path: "/love-quiz",
    },
    {
      id: "spin-the-wheel",
      title: "Spin the Wheel",
      description: "Spin the wheel and get a fun romantic action for couples",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      path: "/spin-the-wheel",
    },
    {
      id: "love-doctor",
      title: "Love Doctor",
      description: "Get personalized advice and insights to improve your relationship",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      path: "/love-doctor",
    },
    {
      id: "pickup-lines",
      title: "Pickup Lines",
      description: "Generate fun and romantic pickup lines for any occasion",
      icon: Smile,
      color: "from-pink-500 to-rose-500",
      path: "/pickup-lines",
    },
    {
  id: "lovers-board",
  title: "Lovers Board",
  description: "Post and read anonymous romantic confessions on a vintage notice board",
  icon: MessageCircle,
  color: "from-rose-500 to-pink-500",
  path: "/lovers-board",
}

  ];

  const filteredAlgorithms = algorithms.filter(algo =>
    algo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    algo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
      
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
      >
        {isPlaying ? (
          <Music2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <FloatingHearts />

      <div className="container mx-auto px-4 py-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F075AE]">
            Love Algorithms
          </h1>
          <p className="text-xl text-[#EE6983] max-w-2xl mx-auto mt-4">
            Explore our collection of romantic algorithms and tools to celebrate love
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700 placeholder-pink-300 shadow-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredAlgorithms.map((algo, index) => {
            const Icon = algo.icon;
            return (
              <motion.div
                key={algo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(algo.path)}
                className="group cursor-pointer"
              >
                <div className="relative h-full rounded-2xl shadow-lg hover:bg-[#FFE4EF] hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50">

                  <div className={`absolute inset-0 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative p-8">

                    <div className="mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-16 h-16 text-pink-500 drop-shadow-md" />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#F75270] mb-3 group-hover:text-pink-600">
                      {algo.title}
                    </h3>

                    <p className="text-[#E45A92] mb-6">
                      {algo.description}
                    </p>

                    <div className="flex items-center text-[#E45A92] font-semibold group-hover:gap-3 gap-2">
                      <span>Try it now</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20">
                    <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredAlgorithms.length === 0 && (
          <p className="text-center text-pink-400 mt-10 text-lg">
            No algorithms found 💔
          </p>
        )}

      </div>
    </main>
  );
}
