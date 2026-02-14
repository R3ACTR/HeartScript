"use client";

import { Heart, Calculator, Flame, MessageCircle, Sparkles, PenTool, Rose, Search, Music, Music2, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FloatingHearts from "./algorithms/flames/FloatingHearts";
import { useState, useRef, useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Try to autoplay when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      // Attempt to autoplay, but most browsers will block it
      audio.play().catch(() => {
        // Autoplay was blocked, user needs to interact first
        console.log("Autoplay blocked - user interaction required");
      }).then(() => {
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
}

  ];

  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />
      
      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <Music2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Music Indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-24 z-50 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1 bg-pink-500 rounded-full"
              />
              <motion.div
                animate={{ height: [12, 20, 12] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                className="w-1 bg-pink-500 rounded-full"
              />
              <motion.div
                animate={{ height: [8, 14, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                className="w-1 bg-pink-500 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-pink-600">Romantic Music</span>
          </div>
        </motion.div>
      )}

      <FloatingHearts />
      {/* Dynamic Background Elements (inspired by previous Hero) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-pink-300/20 blur-[120px] rounded-full mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-200/20 blur-[100px] rounded-full mix-blend-multiply animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.img
            src="/heart.webp"
            alt="heart"
            className="w-8 h-8"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />

            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F075AE]">
              Love Algorithms
            </h1>
            <motion.img
            src="/heart.webp"
            alt="heart"
            className="w-8 h-8"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />

          </div>
          <p className="text-xl text-[#EE6983] max-w-2xl mx-auto">
            Explore our collection of romantic algorithms and tools to celebrate love
          </p>
        </motion.div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {algorithms.map((algo, index) => (
            <motion.div
              key={algo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(algo.path)}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-[#] backdrop-blur-sm rounded-2xl shadow-lg hover:bg-[#FFE4EF] hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50">
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8">
                  
                  {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={
                    algo.id === "love-calculator"
                      ? "/calc.webp"
                      : algo.id === "flames"
                      ? "/flames.webp"
                      : algo.id === "nickname-generator"
                      ? "/nickname.webp"
                      : "/val-card.webp"
                  }
                  alt={algo.title}
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
              </div>




                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-[#F75270] mb-3 group-hover:text-pink-600 transition-colors">
                    {algo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#E45A92] leading-relaxed mb-6">
                    {algo.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-[#E45A92] font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Try it now</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Decorative Hearts */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
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
