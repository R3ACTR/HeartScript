/**
 * 💝 Valentine's Day Special Edition - Drake Equation Love Calculator
 * 
 * A romantic interactive calculator that uses the Drake Equation formula
 * to estimate the number of potential soulmates in a given population.
 * 
 * Color Psychology Design Strategy:
 * - Deep Rose (#C41E3A): Evokes passion, romance, and accelerated heart rate
 * - Wine Red (#8B1538): Represents deep commitment and lasting love
 * - Blush Pink (#F4C2C2): Creates tenderness, intimacy, and romantic atmosphere
 * - Champagne Gold (#F7E7CE): Signifies preciousness, uniqueness, and celebration
 * - Cream White (#FFFAF5): Provides warmth, purity, and visual comfort
 * 
 * @component DrakeCalculatorValentine
 * @version 2.0.0 - Valentine's Special Edition
 * @author Your Name
 */

"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Sparkles, 
  Users, 
  RotateCcw,
  Crown,
  Gift,
  Search
} from "lucide-react";
import {
  calculatePotentialPartners,
  getHumorCategory,
  validateInput,
  LOCATIONS,
  AGE_RANGES,
  EDUCATION_LEVELS,
  ATTRACTIVENESS_LEVELS,
  RECIPROCITY_LEVELS,
  PERSONALITY_TAGS,
  type DrakeInput,
  type DrakeResult,
  type PersonalityTag
} from "@/algorithms/drake-equation";

/**
 * Interface for form state management
 * Tracks all user inputs before calculation
 */
interface FormState {
  /** Key identifier for selected geographic location */
  locationKey: string;
  /** Key identifier for preferred age range */
  ageRangeKey: string;
  /** Key identifier for education level filter */
  educationKey: string;
  /** Index for attractiveness standard slider (0-4) */
  attractivenessIndex: number;
  /** Array of selected personality trait IDs */
  selectedTags: string[];
  /** Index for reciprocity probability level (0-4) */
  reciprocityIndex: number;
  /** Boolean flag to filter for single individuals only */
  singleOnly: boolean;
}

/**
 * Valentine's Day Color Palette
 * Based on color psychology research for romantic interfaces
 */
const VALENTINE_COLORS = {
  /** Deep Rose - Primary action color, evokes passion and love */
  rose: "#C41E3A",
  /** Wine Red - Secondary color for depth and commitment */
  wine: "#8B1538",
  /** Blush Pink - Soft accent for backgrounds and hover states */
  blush: "#F4C2C2",
  /** Champagne Gold - Luxury accent for icons and highlights */
  gold: "#F7E7CE",
  /** Cream White - Clean background with warm undertones */
  cream: "#FFFAF5",
  /** Soft Coral - Alternative accent for variety */
  coral: "#FF6B6B",
  /** Lavender Mist - Subtle tertiary accent */
  lavender: "#E6E6FA"
} as const;

/**
 * Animation configuration for romantic micro-interactions
 */
const ANIMATIONS = {
  /** Floating heart animation for background decoration */
  floatingHeart: {
    y: [-10, 10, -10] as unknown as number[],
    rotate: [0, 5, -5, 0] as unknown as number[],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  /** Scale up animation for result reveal */
  resultReveal: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 0.3, type: "spring", stiffness: 200 }
  },
  /** Staggered entrance for calculation steps */
  stepEntrance: (index: number) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.4 + index * 0.05 }
  })
} as const;

/**
 * Main Component: DrakeCalculatorValentine
 * 
 * Renders an interactive love calculator with Valentine's Day theming.
 * Features form validation, animated results, and detailed calculation breakdown.
 * 
 * @returns {JSX.Element} The complete calculator interface
 */
export default function DrakeCalculatorValentine(): React.ReactNode {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Form state containing all user preferences
   * Initialized with sensible defaults for Hong Kong demographic
   */
  const [formState, setFormState] = useState<FormState>({
    locationKey: "hong-kong",
    ageRangeKey: "24-30",
    educationKey: "university",
    attractivenessIndex: 2, // Default: "Attractive" (middle option)
    selectedTags: [],
    reciprocityIndex: 2, // Default: "Moderate" 50% chance
    singleOnly: true
  });

  /** Stores calculation result after form submission */
  const [result, setResult] = useState<DrakeResult | null>(null);
  
  /** Loading state for calculation animation */
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  /** Error message display state */
  const [error, setError] = useState<string | null>(null);

  // ==================== EVENT HANDLERS ====================

  /**
   * Toggles personality tag selection
   * Adds or removes tag ID from selectedTags array
   * 
   * @param {string} tagId - Unique identifier for personality trait
   */
  const handleTagToggle = useCallback((tagId: string): void => {
    setFormState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }));
  }, []);

  /**
   * Constructs DrakeInput object from current form state
   * Maps string keys to actual data objects from constants
   * 
   * @returns {DrakeInput} Formatted input for calculation algorithm
   */
  const constructInput = useCallback((): DrakeInput => {
    // Map selected tag IDs to full PersonalityTag objects
    const selectedTagObjects = formState.selectedTags
      .map(id => PERSONALITY_TAGS.find(tag => tag.id === id))
      .filter((tag): tag is PersonalityTag => tag !== undefined);

    return {
      location: LOCATIONS[formState.locationKey],
      ageRange: AGE_RANGES[formState.ageRangeKey],
      education: EDUCATION_LEVELS[formState.educationKey],
      attractiveness: ATTRACTIVENESS_LEVELS[formState.attractivenessIndex],
      personalityTags: selectedTagObjects,
      reciprocity: RECIPROCITY_LEVELS[formState.reciprocityIndex],
      singleOnly: formState.singleOnly
    };
  }, [formState]);

  /**
   * Main calculation handler
   * Validates input, simulates processing delay, and triggers result display
   * Includes error handling for invalid inputs
   */
  const handleCalculate = useCallback(async (): Promise<void> => {
    // Reset previous states
    setError(null);
    setIsCalculating(true);

    // Simulate romantic "destiny calculation" delay (1.8s)
    await new Promise(resolve => setTimeout(resolve, 1800));

    try {
      const input = constructInput();
      const validation = validateInput(input);
      
      if (!validation.valid) {
        setError(validation.error || "Invalid input parameters");
        setIsCalculating(false);
        return;
      }

      const calculationResult = calculatePotentialPartners(input);
      setResult(calculationResult);
    } catch (err) {
      setError("Calculation failed. The love universe is temporarily unavailable.");
      console.error("Drake Equation calculation error:", err);
    } finally {
      setIsCalculating(false);
    }
  }, [constructInput]);

  /**
   * Resets calculator to initial state
   * Clears results and restores default form values
   */
  const handleReset = useCallback((): void => {
    setResult(null);
    setError(null);
    setFormState({
      locationKey: "hong-kong",
      ageRangeKey: "24-30",
      educationKey: "university",
      attractivenessIndex: 2,
      selectedTags: [],
      reciprocityIndex: 2,
      singleOnly: true
    });
  }, []);

  // ==================== DERIVED STATE ====================

  /** Current attractiveness level object based on slider index */
  const currentAttractiveness = ATTRACTIVENESS_LEVELS[formState.attractivenessIndex];
  
  /** Current reciprocity level object based on dropdown selection */
  const currentReciprocity = RECIPROCITY_LEVELS[formState.reciprocityIndex];

  // ==================== RENDER: RESULTS VIEW ====================

  /**
   * Render calculation results with Valentine's Day styling
   * Includes animated number reveal, humor category, and step breakdown
   */
  if (result) {
    const humor = getHumorCategory(result.finalNumber);
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        {/* Main Result Card */}
        <div 
          className="rounded-3xl shadow-2xl overflow-hidden border-2 relative"
          style={{ 
            backgroundColor: VALENTINE_COLORS.cream,
            borderColor: VALENTINE_COLORS.blush,
            boxShadow: `0 20px 60px rgba(196, 30, 58, 0.2), 0 0 0 1px rgba(247, 231, 206, 0.5)`
          }}
        >
          {/* 
            Result Header Section
            Features romantic gradient background with floating heart decorations
          */}
          <div 
            className="p-8 text-center text-white relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 100%)`
            }}
          >
            {/* Floating decorative hearts - background layer */}
            <motion.div 
              animate={ANIMATIONS.floatingHeart}
              className="absolute top-4 left-8 text-4xl opacity-20"
              aria-hidden="true"
            >
              💕
            </motion.div>
            <motion.div 
              animate={{ 
                y: [10, -10, 10], 
                rotate: [0, -5, 5, 0],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute bottom-4 right-8 text-3xl opacity-20"
              aria-hidden="true"
            >
              💖
            </motion.div>
            
            {/* Category Emoji with spring animation */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-4 filter drop-shadow-lg"
              role="img"
              aria-label={humor.title}
            >
              {humor.emoji}
            </motion.div>
            
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ textShadow: `0 2px 10px rgba(0,0,0,0.2)` }}
            >
              {humor.title}
            </h2>
            
            <p className="opacity-90 flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" style={{ color: VALENTINE_COLORS.gold }} />
              Your Valentine&apos;s Destiny
              <Crown className="w-4 h-4" style={{ color: VALENTINE_COLORS.gold }} />
            </p>
          </div>

          {/* Result Body Content */}
          <div className="p-8">
            {/* Big Number Display */}
            <div className="text-center mb-8">
              <motion.div 
                initial={ANIMATIONS.resultReveal.initial}
                animate={ANIMATIONS.resultReveal.animate}
                transition={ANIMATIONS.resultReveal.transition}
                className="text-6xl font-bold mb-2"
                style={{ 
                  background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 50%, ${VALENTINE_COLORS.coral} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 6px rgba(196, 30, 58, 0.2))'
                }}
              >
                {result.finalNumber.toLocaleString()}
              </motion.div>
              <p 
                className="text-lg font-medium"
                style={{ color: VALENTINE_COLORS.wine }}
              >
                Potential Soulmates Waiting for You 💝
              </p>
            </div>

            {/* Humor/Description Text Box */}
            <div 
              className="rounded-2xl p-6 mb-6 border"
              style={{ 
                backgroundColor: 'rgba(244, 194, 194, 0.2)',
                borderColor: VALENTINE_COLORS.blush
              }}
            >
              <p 
                className="leading-relaxed text-center"
                style={{ color: VALENTINE_COLORS.wine }}
              >
                {humor.text}
              </p>
            </div>

            {/* Calculation Steps Breakdown */}
            <div className="mb-6">
              <h3 
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: VALENTINE_COLORS.rose }}
              >
                <Gift className="w-5 h-5" />
                Love Equation Breakdown
              </h3>
              
              {/* Mathematical Formula Display */}
              <code 
                className="block p-3 rounded-xl text-sm mb-4 font-mono border overflow-x-auto"
                style={{ 
                  backgroundColor: 'rgba(247, 231, 206, 0.3)',
                  borderColor: VALENTINE_COLORS.gold,
                  color: VALENTINE_COLORS.wine
                }}
              >
                {result.formula}
              </code>
              
              {/* Step-by-step calculation items */}
              <div className="space-y-2">
                {result.steps.map((step, idx) => (
                  <motion.div 
                    key={`step-${idx}`}
                    initial={ANIMATIONS.stepEntrance(idx).initial}
                    animate={ANIMATIONS.stepEntrance(idx).animate}
                    transition={ANIMATIONS.stepEntrance(idx).transition}
                    className="flex justify-between items-center p-3 rounded-xl border-l-4"
                    style={{ 
                      backgroundColor: 'rgba(255, 250, 245, 0.8)',
                      borderLeftColor: VALENTINE_COLORS.rose,
                      borderTop: `1px solid ${VALENTINE_COLORS.blush}`,
                      borderRight: `1px solid ${VALENTINE_COLORS.blush}`,
                      borderBottom: `1px solid ${VALENTINE_COLORS.blush}`
                    }}
                  >
                    <div>
                      <span 
                        className="font-medium"
                        style={{ color: VALENTINE_COLORS.wine }}
                      >
                        {step.label}
                      </span>
                      <span 
                        className="text-sm ml-2 font-mono"
                        style={{ color: VALENTINE_COLORS.rose }}
                      >
                        ({step.symbol})
                      </span>
                    </div>
                    <div className="text-right">
                      <span 
                        className="font-bold"
                        style={{ color: VALENTINE_COLORS.rose }}
                      >
                        {step.percentage.toFixed(1)}%
                      </span>
                      {step.runningTotal && (
                        <span 
                          className="text-sm ml-2 font-medium"
                          style={{ color: VALENTINE_COLORS.wine }}
                        >
                          → {Math.round(step.runningTotal).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${VALENTINE_COLORS.wine} 0%, ${VALENTINE_COLORS.rose} 100%)`,
                boxShadow: `0 10px 30px rgba(196, 30, 58, 0.3)`
              }}
            >
              <RotateCcw className="w-5 h-5" />
              Find Love Again 💫
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ==================== RENDER: INPUT FORM ====================

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 relative">
      {/* 
        Background Floating Hearts Decoration
        Creates romantic atmosphere without interfering with usability
      */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <motion.div 
          animate={{ y: [-20, 20], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-6xl"
          style={{ color: VALENTINE_COLORS.blush }}
        >
          💕
        </motion.div>
        <motion.div 
          animate={{ y: [20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-10 text-5xl"
          style={{ color: VALENTINE_COLORS.blush }}
        >
          💖
        </motion.div>
        <motion.div 
          animate={{ y: [-15, 15], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-20 text-4xl"
          style={{ color: VALENTINE_COLORS.blush }}
        >
          💗
        </motion.div>
      </div>

      {/* Main Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl shadow-2xl p-8 border-2 relative overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(255, 250, 245, 0.95)',
          borderColor: VALENTINE_COLORS.blush,
          boxShadow: `0 25px 80px rgba(196, 30, 58, 0.15), 0 0 0 1px rgba(247, 231, 206, 0.8)`
        }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 text-2xl opacity-20" aria-hidden="true">💝</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-20" aria-hidden="true">💕</div>

        {/* Header Section */}
        <header className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 100%)`,
              boxShadow: `0 10px 30px rgba(196, 30, 58, 0.3)`
            }}
          >
            <Heart className="w-10 h-10 text-white fill-current" aria-hidden="true" />
          </motion.div>
          
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Love Destiny Calculator
          </h1>
          
          <p 
            style={{ color: VALENTINE_COLORS.wine }} 
            className="opacity-80"
          >
            Discover how many hearts are waiting for you 💫
          </p>
        </header>

        {/* Error Message Display */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl text-center border"
              style={{ 
                backgroundColor: 'rgba(196, 30, 58, 0.1)',
                borderColor: VALENTINE_COLORS.rose,
                color: VALENTINE_COLORS.wine
              }}
              role="alert"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form */}
        <form 
          className="space-y-6" 
          onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}
          aria-label="Love calculator preferences form"
        >
          
          {/* Location Selection Field */}
          <fieldset className="group">
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-2 w-full"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <MapPin className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Where is Your Heart? 📍
            </legend>
            <select
              className="w-full p-3 rounded-xl border-2 bg-white transition-all focus:outline-none focus:ring-2"
              style={{ 
                borderColor: VALENTINE_COLORS.blush,
                color: VALENTINE_COLORS.wine
              }}
              value={formState.locationKey}
              onChange={(e) => setFormState({...formState, locationKey: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = VALENTINE_COLORS.rose}
              onBlur={(e) => e.target.style.borderColor = VALENTINE_COLORS.blush}
              aria-label="Select your location"
            >
              {Object.entries(LOCATIONS).map(([key, loc]) => (
                <option key={key} value={key}>
                  {loc.name}, {loc.country} ({(loc.population / 1000000).toFixed(1)}M people)
                </option>
              ))}
            </select>
          </fieldset>

          {/* Age Range Selection Field */}
          <fieldset>
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <Calendar className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Age of Romance 🎂
            </legend>
            <select
              className="w-full p-3 rounded-xl border-2 bg-white transition-all"
              style={{ borderColor: VALENTINE_COLORS.blush, color: VALENTINE_COLORS.wine }}
              value={formState.ageRangeKey}
              onChange={(e) => setFormState({...formState, ageRangeKey: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = VALENTINE_COLORS.rose}
              onBlur={(e) => e.target.style.borderColor = VALENTINE_COLORS.blush}
              aria-label="Select preferred age range"
            >
              {Object.entries(AGE_RANGES).map(([key, range]) => (
                <option key={key} value={key}>
                  {range.label} (~{(range.factor * 100).toFixed(0)}% of population)
                </option>
              ))}
            </select>
          </fieldset>

          {/* Education Level Selection Field */}
          <fieldset>
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Wisdom Level 🎓
            </legend>
            <select
              className="w-full p-3 rounded-xl border-2 bg-white transition-all"
              style={{ borderColor: VALENTINE_COLORS.blush, color: VALENTINE_COLORS.wine }}
              value={formState.educationKey}
              onChange={(e) => setFormState({...formState, educationKey: e.target.value})}
              onFocus={(e) => e.target.style.borderColor = VALENTINE_COLORS.rose}
              onBlur={(e) => e.target.style.borderColor = VALENTINE_COLORS.blush}
              aria-label="Select education level preference"
            >
              {Object.entries(EDUCATION_LEVELS).map(([key, edu]) => (
                <option key={key} value={key}>
                  {edu.name} (~{(edu.factor * 100).toFixed(0)}%)
                </option>
              ))}
            </select>
          </fieldset>

          {/* Attractiveness Standard Slider */}
          <fieldset>
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <Sparkles className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Beauty Standards ✨
            </legend>
            <input
              type="range"
              min="0"
              max={ATTRACTIVENESS_LEVELS.length - 1}
              value={formState.attractivenessIndex}
              onChange={(e) => setFormState({
                ...formState, 
                attractivenessIndex: parseInt(e.target.value)
              })}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ 
                background: `linear-gradient(to right, ${VALENTINE_COLORS.blush} 0%, ${VALENTINE_COLORS.rose} 100%)`,
                accentColor: VALENTINE_COLORS.rose
              }}
              aria-label="Select attractiveness standard"
              aria-valuemin={0}
              aria-valuemax={ATTRACTIVENESS_LEVELS.length - 1}
              aria-valuenow={formState.attractivenessIndex}
            />
            <div className="mt-2 text-center">
              <span 
                className="font-semibold"
                style={{ color: VALENTINE_COLORS.rose }}
              >
                {currentAttractiveness.label}
              </span>
              <p 
                className="text-sm mt-1"
                style={{ color: VALENTINE_COLORS.wine, opacity: 0.7 }}
              >
                {currentAttractiveness.description}
              </p>
            </div>
          </fieldset>

          {/* Personality Traits Selection */}
          <fieldset>
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-3"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <Heart className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Desired Traits (Choose your favorites) 💕
            </legend>
            <div 
              className="grid grid-cols-3 gap-2"
              role="group"
              aria-label="Personality traits selection"
            >
              {PERSONALITY_TAGS.map((tag) => (
                <motion.button
                  key={tag.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagToggle(tag.id)}
                  className="p-2 rounded-lg text-sm transition-all border-2 font-medium"
                  style={{
                    backgroundColor: formState.selectedTags.includes(tag.id) 
                      ? VALENTINE_COLORS.rose 
                      : VALENTINE_COLORS.cream,
                    color: formState.selectedTags.includes(tag.id) 
                      ? 'white' 
                      : VALENTINE_COLORS.wine,
                    borderColor: formState.selectedTags.includes(tag.id) 
                      ? VALENTINE_COLORS.rose 
                      : VALENTINE_COLORS.blush,
                    boxShadow: formState.selectedTags.includes(tag.id) 
                      ? `0 4px 15px rgba(196, 30, 58, 0.3)` 
                      : 'none'
                  }}
                  aria-pressed={formState.selectedTags.includes(tag.id)}
                >
                  <span className="mr-1" aria-hidden="true">{tag.icon}</span>
                  {tag.name}
                </motion.button>
              ))}
            </div>
          </fieldset>

          {/* Reciprocity Probability Selection */}
          <fieldset>
            <legend 
              className="flex items-center gap-2 text-sm font-semibold mb-2"
              style={{ color: VALENTINE_COLORS.wine }}
            >
              <Users className="w-4 h-4" style={{ color: VALENTINE_COLORS.rose }} aria-hidden="true" />
              Chance of Mutual Attraction 🎯
            </legend>
            <select
              className="w-full p-3 rounded-xl border-2 bg-white transition-all"
              style={{ borderColor: VALENTINE_COLORS.blush, color: VALENTINE_COLORS.wine }}
              value={formState.reciprocityIndex}
              onChange={(e) => setFormState({
                ...formState, 
                reciprocityIndex: parseInt(e.target.value)
              })}
              onFocus={(e) => e.target.style.borderColor = VALENTINE_COLORS.rose}
              onBlur={(e) => e.target.style.borderColor = VALENTINE_COLORS.blush}
              aria-label="Select reciprocity probability"
            >
              {RECIPROCITY_LEVELS.map((level, index) => (
                <option key={index} value={index}>
                  {level.label}
                </option>
              ))}
            </select>
            <p 
              className="text-sm mt-2"
              style={{ color: VALENTINE_COLORS.wine, opacity: 0.7 }}
            >
              {currentReciprocity.description}
            </p>
          </fieldset>

          {/* Single Status Filter Checkbox */}
          <div 
            className="flex items-center gap-3 p-4 rounded-xl border-2"
            style={{ 
              backgroundColor: 'rgba(244, 194, 194, 0.2)',
              borderColor: VALENTINE_COLORS.blush
            }}
          >
            <input
              type="checkbox"
              id="singleOnly"
              checked={formState.singleOnly}
              onChange={(e) => setFormState({...formState, singleOnly: e.target.checked})}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: VALENTINE_COLORS.rose }}
            />
            <label 
              htmlFor="singleOnly" 
              style={{ color: VALENTINE_COLORS.wine }} 
              className="cursor-pointer select-none"
            >
              Only count available hearts (~40% of population) 💔➡️💕
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isCalculating}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: `0 15px 40px rgba(196, 30, 58, 0.4)` 
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ 
              background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 100%)`,
              boxShadow: `0 10px 30px rgba(196, 30, 58, 0.3)`
            }}
            aria-label={isCalculating ? "Calculating your results" : "Calculate potential soulmates"}
          >
            {isCalculating ? (
              <>
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <Heart className="w-6 h-6 fill-current" />
                </motion.div>
                <span>Calculating Destiny...</span>
              </>
            ) : (
              <>
                <Search className="w-6 h-6" aria-hidden="true" />
                <span>Reveal My Soulmate Count 💝</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}