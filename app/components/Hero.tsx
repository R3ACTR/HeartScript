"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Code2, PenTool, Share2 } from "lucide-react";


const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "I love you, Alex ❤️";
  const [isTyping, setIsTyping] = useState(true);
  const [hearts, setHearts] = useState<any[]>([]);


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        setTimeout(() => {
          setTypedText("");
          index = 0;
          setIsTyping(true);
        }, 3000);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
  const generated = [...Array(12)].map(() => ({
    x: Math.random() * 100,
    size: Math.random() * 40 + 20,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
  }));

  setHearts(generated);
}, []);


  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#fff0f5] selection:bg-pink-200">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-pink-300/30 blur-[120px] rounded-full mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-200/30 blur-[100px] rounded-full mix-blend-multiply animate-pulse delay-1000" />
      </div>

      {/* Floating Hearts Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map((heart, i) => (

          <motion.div
            key={i}
            initial={{
              y: "120vh",
              x: heart.x + "vw",
              opacity: 0,
              scale: 0.5,
            }}

            animate={{
              y: "-20vh",
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}

            className="absolute text-pink-300/40"
          >
            <Heart size={heart.size} fill="currentColor" />

          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 self-center lg:self-start bg-pink-100/50 border border-pink-200 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-pink-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Valentine Special • 24 Hours Only • 2X Score
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1]">
            Write Love. <br />
            Design Hearts. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
              Code Magic.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
            HeartScript is a Valentine Special Next.js project. Generate customizable love cards and explore creative love algorithms in one open-source experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white font-semibold text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="flex items-center gap-2">
                <PenTool size={20} /> Create Your Card
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border border-pink-200 rounded-xl text-gray-700 font-semibold text-lg shadow-sm hover:bg-pink-50 hover:border-pink-300 transition-all flex items-center gap-2 justify-center"
            >
              <Code2 size={20} className="text-pink-500" /> Explore Algorithms
            </motion.button>
          </div>
          
          <div className="pt-2 text-sm text-gray-400 flex items-center justify-center lg:justify-start gap-2">
            <div className="flex -space-x-2">
               {[1,2,3,4].map((i) => (
                 <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover`} />
               ))}
            </div>
            <span>Join 1,200+ romantics coding today</span>
          </div>
        </motion.div>

        {/* Right Content - Card Preview */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative mx-auto lg:mr-0 perspective-1000"
        >
          {/* Decorative elements behind card */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 blur-3xl transform rotate-6 scale-90" />
          
          {/* Card Container */}
          <motion.div
            className="relative w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-xl"
            animate={{ 
               y: [0, -15, 0],
               rotate: [0, 2, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Card Content Mockup */}
            <div className="h-1/2 bg-gradient-to-br from-pink-100 to-red-50 p-6 flex flex-col items-center justify-center relative overflow-hidden">
               {/* Pattern */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
               
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-lg" />
               </motion.div>
            </div>
            
            <div className="h-1/2 p-6 flex flex-col gap-4">
               <div className="font-serif text-2xl text-gray-800 font-bold">
                 Happy Valentine's!
               </div>
               <div className="space-y-2">
                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="h-full bg-pink-500"
                   />
                 </div>
                 <div className="font-mono text-sm text-pink-600 bg-pink-50 p-2 rounded border border-pink-100 min-h-[3rem] flex items-center">
                    {typedText}<span className="animate-pulse">|</span>
                 </div>
               </div>
               
               <div className="mt-auto flex justify-between items-center text-xs text-gray-400">
                 <span>Generated by HeartScript</span>
                 <Share2 size={16} />
               </div>
            </div>
          </motion.div>

          {/* Floating UI Elements around card */}
          <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, delay: 1 }}
             className="absolute -right-8 top-12 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg border border-pink-100 flex items-center gap-2"
          >
            <div className="bg-green-100 p-1.5 rounded text-green-600">
              <Code2 size={16} />
            </div>
            <div className="text-xs font-semibold text-gray-700">
              Algorithm Match: <br/>
              <span className="text-green-600">98% Compatible</span>
            </div>
          </motion.div>

          <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
             className="absolute -left-8 bottom-24 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg border border-pink-100 flex items-center gap-2"
          >
            <div className="bg-red-100 p-1.5 rounded text-red-500">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="text-xs font-semibold text-gray-700">
              Love Score: <br/>
              <span className="text-red-500">1,024 Points</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
