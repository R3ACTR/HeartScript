"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, RefreshCw, Clock, Flame, Gem, Swords, Users, Baby, Handshake } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { calculateFlames } from '@/algorithms/flames.js'; 

type GameStage = 'input' | 'visualizing' | 'result';

export default function FlamesPage() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [stage, setStage] = useState<GameStage>('input');
  
  const [calculation, setCalculation] = useState<any | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayN1, setDisplayN1] = useState<any[]>([]);
  const [displayN2, setDisplayN2] = useState<any[]>([]);
  
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const handleStart = () => {
    if (!name1.trim() || !name2.trim()) return;

    setStartTime(Date.now());
    const result = calculateFlames(name1, name2);
    setCalculation(result);
    
    setDisplayN1(result.name1Letters);
    setDisplayN2(result.name2Letters);
    setCurrentStepIndex(0);
    setStage('visualizing');
  };

  useEffect(() => {
    if (stage !== 'visualizing' || !calculation) return;
    const stepDuration = 800; 
    
    if (currentStepIndex >= calculation.steps.length) {
      const timer = setTimeout(() => {
        setEndTime(Date.now());
        setStage('result');
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      const step = calculation.steps[currentStepIndex];
      setDisplayN1((prev: any[]) => prev.map((l, i) => 
        i === step.name1Index ? { ...l, isCrossed: true, isMatch: true } : { ...l, isMatch: false }
      ));
      setDisplayN2((prev: any[]) => prev.map((l, i) => 
        i === step.name2Index ? { ...l, isCrossed: true, isMatch: true } : { ...l, isMatch: false }
      ));
      setTimeout(() => {
        setDisplayN1((prev: any[]) => prev.map(l => ({ ...l, isMatch: false })));
        setDisplayN2((prev: any[]) => prev.map(l => ({ ...l, isMatch: false })));
      }, 400);
      setCurrentStepIndex(prev => prev + 1);
    }, stepDuration);
    return () => clearTimeout(timer);
  }, [stage, currentStepIndex, calculation]);

  const resetGame = () => {
    setName1('');
    setName2('');
    setStage('input');
    setCalculation(null);
    setStartTime(0);
    setEndTime(0);
  };

  const getResultColor = (result: string) => {
    switch(result) {
      case 'Lovers': return 'text-red-600';
      case 'Marriage': return 'text-purple-600';
      case 'Affection': return 'text-pink-500';
      case 'Friends': return 'text-yellow-500';
      case 'Enemy': return 'text-gray-600';
      case 'Sibling': return 'text-blue-500';
      default: return 'text-pink-600';
    }
  };

  const getResultIcon = (result: string, className: string) => {
    switch(result) {
      case 'Lovers': 
        return <Heart className={className} fill="currentColor" />;
      case 'Marriage': 
        return <Gem className={className} />; 
      case 'Affection': 
        return <Sparkles className={className} />;
      case 'Friends': 
        return <Users className={className} />; 
      case 'Enemy': 
        return <Swords className={className} />; 
      case 'Sibling': 
        return <Baby className={className} />; 
      default: 
        return <Flame className={className} fill="currentColor" />;
    }
  };

  const renderInputStage = () => {
    const thoughts = [
      { text: "Friends?", style: "bg-yellow-100 text-yellow-700 border-yellow-200", delay: "0s" },
      { text: "Lovers?", style: "bg-red-100 text-red-700 border-red-200", delay: "1.5s" },
      { text: "Marriage?", style: "bg-purple-100 text-purple-700 border-purple-200", delay: "0.8s" },
      { text: "Affection?", style: "bg-pink-100 text-pink-700 border-pink-200", delay: "2.2s" },
      { text: "Enemies?", style: "bg-gray-100 text-gray-700 border-gray-200", delay: "0.4s" },
      { text: "Siblings?", style: "bg-blue-100 text-blue-700 border-blue-200", delay: "1.9s" },
    ];

    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl z-10 px-4">
        <div className="relative flex flex-col items-center">
          <div className="relative bg-[#] p-6 rounded-[2rem] shadow-xl border-2 border-pink-100 mb-6 w-72 animate-float-slow">
            <div className="flex flex-wrap gap-3 justify-center content-center h-full min-h-[80px]">
              {thoughts.map((thought, i) => (
                <span 
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm animate-thought-float ${thought.style}`}
                  style={{ animationDelay: thought.delay }}
                >
                  {thought.text}
                </span>
              ))}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full border-b-2 border-r-2 border-pink-100"></div>
            <div className="absolute -bottom-7 left-[45%] w-3 h-3 bg-white rounded-full border border-pink-50"></div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl transition-transform hover:scale-105 duration-500">
             <img 
               src="/teddy.webp" 
               alt="Cute Teddy" 
               className="w-full h-full object-contain"
             />
          </div>
        </div>

        <div className="w-full max-w-md bg-[#] backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white relative transition-all duration-500 transform hover:scale-[1.01]">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-pink-100 mb-4 animate-bounce">
              <Heart className="text-pink-500 fill-pink-500" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-pink-800">Flames Calculator</h1>
            <p className="text-pink-400 mt-2">Discover your FLAMES destiny</p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-pink-700 mb-1 ml-1">Your Name</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700 placeholder-pink-300"
                placeholder="Romeo"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-pink-700 mb-1 ml-1">Partner's Name</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-pink-50 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-gray-700 placeholder-pink-300"
                placeholder="Juliet"
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!name1 || !name2}
              className="w-full py-4 mt-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-pink-200/50 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <span className="tracking-wide">Reveal Destiny</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-10deg]" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  
  const renderVisualizingStage = () => (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-pink-100 z-10">
      <h2 className="text-2xl font-bold text-center text-pink-800 mb-8 flex items-center justify-center gap-3">
        <Heart className="text-pink-400 animate-pulse fill-pink-200" size={24} />
        <span>Analyzing Connection...</span>
        <Heart className="text-pink-400 animate-pulse fill-pink-200" size={24} />
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
        <div className="flex flex-wrap justify-center gap-2 max-w-[45%]">
          {displayN1.map((item, idx) => (
            <div
              key={`n1-${idx}`}
              className={`
                w-10 h-12 flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-500
                ${item.isMatch ? 'bg-pink-500 text-white scale-110 shadow-lg ring-2 ring-pink-300' : ''}
                ${item.isCrossed && !item.isMatch ? 'bg-gray-200 text-gray-400 opacity-60 decoration-4 line-through decoration-pink-600' : 'bg-white text-gray-800 shadow-sm'}
              `}
            >
              {item.char.toUpperCase()}
            </div>
          ))}
        </div>

        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full animate-spin-slow-reverse" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" className="stroke-pink-100" strokeWidth="4" />
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              className="stroke-pink-500 drop-shadow-sm" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="100 200" 
              strokeDashoffset="0"
            />
          </svg>
          
          {/* Beating Heart Icon - kept reasonable size w-12 h-12 */}
          <div className="relative z-10">
            <Heart className="w-12 h-12 text-pink-500 animate-heartbeat" fill="#fb7185" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-[45%]">
          {displayN2.map((item, idx) => (
            <div
              key={`n2-${idx}`}
              className={`
                w-10 h-12 flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-500
                ${item.isMatch ? 'bg-pink-500 text-white scale-110 shadow-lg ring-2 ring-pink-300' : ''}
                ${item.isCrossed && !item.isMatch ? 'bg-gray-200 text-gray-400 opacity-60 decoration-4 line-through decoration-pink-600' : 'bg-white text-gray-800 shadow-sm'}
              `}
            >
              {item.char.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-pink-600 font-medium animate-pulse">
        {calculation && currentStepIndex < calculation.steps.length 
          ? "Crossing out common letters..." 
          : "Calculating remaining bond..."}
      </div>
    </div>
  );

  const renderResultStage = () => {
    if (!calculation) return null;
    const elapsed = ((endTime - startTime) / 1000).toFixed(1);
    
    const getStrokeColorClass = (result: string) => {
       switch(result) {
        case 'Lovers': return 'stroke-red-500';
        case 'Marriage': return 'stroke-purple-500';
        case 'Affection': return 'stroke-pink-500';
        case 'Friends': return 'stroke-yellow-500';
        case 'Enemy': return 'stroke-gray-500';
        case 'Sibling': return 'stroke-blue-500';
        default: return 'stroke-pink-500';
      }
    };

    return (
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-pink-100 z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          
          <div className="relative inline-flex justify-center items-center w-24 h-24 mb-4">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" className="stroke-pink-50" strokeWidth="4" />
              <circle 
                cx="50" cy="50" r="46" 
                fill="none" 
                className={`${getStrokeColorClass(calculation.result)} drop-shadow-sm`} 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="289" 
                strokeDashoffset="289"
                style={{ animation: 'draw-circle 1.5s ease-out forwards' }}
              />
            </svg>
            <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center z-10">
               {getResultIcon(calculation.result, `w-10 h-10 ${getResultColor(calculation.result)}`)}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider">Relationship Status</h2>
          <h1 className={`text-6xl font-script font-bold my-2 ${getResultColor(calculation.result)} drop-shadow-sm`}>
            {calculation.result}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-50 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[#FFAAB8]">{calculation.remainingCount}</div>
            <div className="text-xs font-semibold text-[#F39EB6] uppercase mt-1">Remaining Letters</div>
          </div>
          <div className="bg-pink-50 p-4 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[#FFAAB8] flex items-center justify-center gap-1">
              {elapsed}<span className="text-sm">s</span>
            </div>
            <div className="text-xs font-semibold text-[#F39EB6] uppercase mt-1 flex items-center justify-center gap-1">
              <Clock size={12} /> Time Taken
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full py-4 bg-[#FFAAB8] border-2 border-[#FFD8DF] text-white rounded-2xl font-bold hover:text-[#FFAAB8] hover:bg-white hover:[#FFD8DF] transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Another Couple</span>
        </button>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 overflow-hidden text-slate-800">
      <FloatingHearts />
      
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
        {stage === 'input' && renderInputStage()}
        {stage === 'visualizing' && renderVisualizingStage()}
        {stage === 'result' && renderResultStage()}
      </main>

      
      <style jsx global>{`
        @keyframes float-thought {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          75% { transform: translateY(3px) rotate(-2deg); }
        }
        .animate-thought-float {
          animation: float-thought 3s ease-in-out infinite;
        }
        .animate-float-slow {
           animation: float-thought 5s ease-in-out infinite;
        }
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 4s linear infinite;
        }
      `}</style>
    </div>
  );
}