"use client";

import { Heart, Calculator, Flame, MessageCircle, Sparkles, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const algorithms = [
    {
      id: "love-calculator",
      title: "Love Calculator",
      description: "Calculate the love compatibility between two people using a special algorithm",
      icon: Calculator,
      color: "from-pink-500 to-rose-500",
      path: "/love-calculator",
    },
    {
      id: "flames",
      title: "FLAMES Game",
      description: "Discover your relationship status with the classic FLAMES algorithm",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      path: "/algorithms/flames",
    },
    {
      id: "nickname-generator",
      title: "Couple Nickname",
      description: "Generate cute couple nicknames by combining two names",
      icon: MessageCircle,
      color: "from-purple-500 to-pink-500",
      path: "/nickname-generator",
    },
    {
      id: "card-creator",
      title: "Valentine Card",
      description: "Create and send beautiful personalized valentine cards",
      icon: PenTool,
      color: "from-red-500 to-pink-500",
      path: "/create",
    },
    {
      id: "truth-or-dare",
      title: "Truth or Dare",
      description: "A Valentine’s twist on Truth or Dare with sweet questions and romantic challenges made to bring you closer. 💘",
      icon: PenTool,
      color: "from-red-500 to-pink-500",
      path: "/truth-or-dare",
    },

  ];

  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
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
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900">
              Love Algorithms
            </h1>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50">
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${algo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${algo.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <algo.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {algo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {algo.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-pink-600 font-semibold group-hover:gap-3 gap-2 transition-all">
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
