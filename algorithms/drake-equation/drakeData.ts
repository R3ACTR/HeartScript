/**
 * Type definitions and data constants for Drake Equation Love Calculator
 * 
 * All data sourced from demographic statistics and psychological research
 * Approximations used where exact data varies by region/time
 */

// ==================== TYPE DEFINITIONS ====================

export interface LocationData {
  name: string;
  population: number;
  femaleRatio: number;  // Ratio of females (adjust if targeting same gender)
  maleRatio: number;    // Added for completeness
  density: 'high' | 'medium' | 'low';
  country: string;
}

export interface AgeRange {
  min: number;
  max: number;
  factor: number;  // Approximate percentage of population in this range
  label: string;
}

export interface EducationLevel {
  name: string;
  factor: number;  // Percentage of population with this education level
  description: string;
}

export interface AttractivenessLevel {
  value: number;   // Probability factor (top X%)
  label: string;
  description: string;
}

export interface ReciprocityLevel {
  value: number;   // Probability they like you back
  label: string;
  description: string;
}

export interface PersonalityTag {
  id: string;
  name: string;
  factor: number;  // Probability someone has this trait
  icon: string;
}

export interface CalculationStep {
  label: string;
  symbol: string;
  value: number;
  percentage: number;
  description: string;
  runningTotal?: number;
}

export interface DrakeInput {
  location: LocationData;
  ageRange: AgeRange;
  education: EducationLevel;
  attractiveness: AttractivenessLevel;
  personalityTags: PersonalityTag[];
  reciprocity: ReciprocityLevel;
  singleOnly: boolean;
  userGender?: 'male' | 'female' | 'other';  // For future same-gender dating support
}

export interface DrakeResult {
  finalNumber: number;
  exactNumber: number;
  steps: CalculationStep[];
  formula: string;
  input: DrakeInput;
}

// ==================== DATA CONSTANTS ====================

export const LOCATIONS: Record<string, LocationData> = {
  'hong-kong': {
    name: 'Hong Kong',
    country: 'China',
    population: 7336000,
    femaleRatio: 0.538,
    maleRatio: 0.462,
    density: 'high'
  },
  'london': {
    name: 'London',
    country: 'United Kingdom',
    population: 8982000,
    femaleRatio: 0.507,
    maleRatio: 0.493,
    density: 'high'
  },
  'tokyo': {
    name: 'Tokyo',
    country: 'Japan',
    population: 13960000,
    femaleRatio: 0.513,
    maleRatio: 0.487,
    density: 'high'
  },
  'taipei': {
    name: 'Taipei',
    country: 'Taiwan',
    population: 2615000,
    femaleRatio: 0.521,
    maleRatio: 0.479,
    density: 'medium'
  },
  'singapore': {
    name: 'Singapore',
    country: 'Singapore',
    population: 5686000,
    femaleRatio: 0.472,
    maleRatio: 0.528,
    density: 'high'
  },
  'new-york': {
    name: 'New York City',
    country: 'United States',
    population: 8468000,
    femaleRatio: 0.523,
    maleRatio: 0.477,
    density: 'high'
  },
  'paris': {
    name: 'Paris',
    country: 'France',
    population: 2161000,
    femaleRatio: 0.528,
    maleRatio: 0.472,
    density: 'high'
  },
  'sydney': {
    name: 'Sydney',
    country: 'Australia',
    population: 5312000,
    femaleRatio: 0.508,
    maleRatio: 0.492,
    density: 'medium'
  },
  'worldwide': {
    name: 'Worldwide',
    country: 'Earth',
    population: 8000000000,
    femaleRatio: 0.496,
    maleRatio: 0.504,
    density: 'low'
  }
};

export const AGE_RANGES: Record<string, AgeRange> = {
  '18-22': { min: 18, max: 22, factor: 0.06, label: '18-22' },
  '18-25': { min: 18, max: 25, factor: 0.12, label: '18-25' },
  '20-28': { min: 20, max: 28, factor: 0.11, label: '20-28' },
  '24-30': { min: 24, max: 30, factor: 0.10, label: '24-30' },
  '25-35': { min: 25, max: 35, factor: 0.14, label: '25-35' },
  '28-35': { min: 28, max: 35, factor: 0.12, label: '28-35' },
  '30-40': { min: 30, max: 40, factor: 0.13, label: '30-40' },
  '32-40': { min: 32, max: 40, factor: 0.11, label: '32-40' },
  '35-45': { min: 35, max: 45, factor: 0.12, label: '35-45' },
  'any': { min: 18, max: 99, factor: 1.0, label: 'Any Age' }
};

export const EDUCATION_LEVELS: Record<string, EducationLevel> = {
  'high-school': {
    name: 'High School or above',
    factor: 0.85,
    description: 'Secondary education completion'
  },
  'university': {
    name: 'University or above',
    factor: 0.35,
    description: 'Bachelor degree or higher'
  },
  'master': {
    name: "Master's or above",
    factor: 0.12,
    description: 'Graduate degree'
  },
  'phd': {
    name: 'PhD',
    factor: 0.015,
    description: 'Doctoral degree'
  },
  'any': {
    name: 'Any Education',
    factor: 1.0,
    description: 'No education requirement'
  }
};

export const ATTRACTIVENESS_LEVELS: AttractivenessLevel[] = [
  {
    value: 0.001,
    label: 'Supermodel (Top 0.1%)',
    description: 'Extremely high standards'
  },
  {
    value: 0.01,
    label: 'Celebrity Level (Top 1%)',
    description: 'You have very high standards!'
  },
  {
    value: 0.05,
    label: 'Very Attractive (Top 5%)',
    description: 'Reasonable high standards'
  },
  {
    value: 0.15,
    label: 'Above Average (Top 15%)',
    description: 'Selective but realistic'
  },
  {
    value: 0.30,
    label: 'Average+ (Top 30%)',
    description: 'Open-minded approach'
  },
  {
    value: 0.50,
    label: 'Decent Looking (Top 50%)',
    description: 'Very open-minded'
  },
  {
    value: 0.70,
    label: 'Not Picky (Top 70%)',
    description: 'Personality matters more'
  }
];

export const RECIPROCITY_LEVELS: ReciprocityLevel[] = [
  {
    value: 0.5,
    label: '50% - Extremely Confident',
    description: 'You believe you are very attractive'
  },
  {
    value: 0.3,
    label: '30% - Quite Popular',
    description: 'You have good social skills'
  },
  {
    value: 0.2,
    label: '20% - Reasonably Likable',
    description: 'Average confidence level'
  },
  {
    value: 0.1,
    label: '10% - Normal Person',
    description: 'Humble and realistic'
  },
  {
    value: 0.05,
    label: '5% - A Bit Shy',
    description: 'Need to be more proactive'
  },
  {
    value: 0.02,
    label: '2% - Social Anxiety',
    description: 'Work on social skills first'
  }
];

export const PERSONALITY_TAGS: PersonalityTag[] = [
  { id: 'humor', name: 'Humorous', factor: 0.6, icon: '😄' },
  { id: 'kind', name: 'Kind & Caring', factor: 0.7, icon: '💝' },
  { id: 'smart', name: 'Intelligent', factor: 0.4, icon: '🧠' },
  { id: 'ambitious', name: 'Ambitious', factor: 0.35, icon: '🚀' },
  { id: 'creative', name: 'Creative', factor: 0.3, icon: '🎨' },
  { id: 'sporty', name: 'Athletic', factor: 0.25, icon: '⚽' },
  { id: 'musical', name: 'Musical', factor: 0.2, icon: '🎵' },
  { id: 'cooking', name: 'Good Cook', factor: 0.3, icon: '🍳' },
  { id: 'traveler', name: 'Loves Travel', factor: 0.4, icon: '✈️' },
  { id: 'gamer', name: 'Gamer', factor: 0.2, icon: '🎮' },
  { id: 'bookworm', name: 'Book Lover', factor: 0.25, icon: '📚' },
  { id: 'outdoorsy', name: 'Outdoorsy', factor: 0.3, icon: '🏔️' },
  { id: 'pet-lover', name: 'Pet Lover', factor: 0.5, icon: '🐱' },
  { id: 'romantic', name: 'Romantic', factor: 0.4, icon: '🌹' },
  { id: 'honest', name: 'Honest', factor: 0.6, icon: '💎' }
];

// Default configuration
export const DEFAULT_CONFIG = {
  location: LOCATIONS['hong-kong'],
  ageRange: AGE_RANGES['24-30'],
  education: EDUCATION_LEVELS['university'],
  attractiveness: ATTRACTIVENESS_LEVELS[2], // Top 5%
  reciprocity: RECIPROCITY_LEVELS[2], // 20%
  singleOnly: true
};