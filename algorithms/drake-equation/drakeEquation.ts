/**
 * Drake Equation Love Calculator Algorithm
 * 
 * Based on the famous Drake Equation from astrophysics, adapted for calculating
 * the number of potential romantic partners based on user criteria.
 * 
 * Original Drake Equation: N = R* × fp × ne × fl × fi × fc × L
 * Love Adaptation: G = N × fw × fL × fA × fU × fB × fP × fR × fS
 * 
 * Time Complexity Analysis:
 * - calculatePotentialPartners: O(1) - Constant time arithmetic operations
 * - calculateSteps: O(1) - Fixed array of calculation steps
 * - Overall: O(1) - All operations are constant time regardless of input size
 * 
 * Space Complexity: O(1) - Fixed amount of memory used for calculations
 * 
 * @author Your Name
 */

import { 
  LocationData, 
  AgeRange, 
  EducationLevel, 
  AttractivenessLevel,
  ReciprocityLevel,
  PersonalityTag,
  DrakeInput,
  DrakeResult,
  CalculationStep 
} from './drakeData';

/**
 * Calculates the number of potential romantic partners based on user criteria
 * 
 * Algorithm: Multiplicative probability chain
 * Each factor represents a filtering criterion applied sequentially
 * 
 * @param input - User preferences and criteria
 * @returns DrakeResult containing final number and calculation steps
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function calculatePotentialPartners(input: DrakeInput): DrakeResult {
  const {
    location,
    ageRange,
    education,
    attractiveness,
    personalityTags,
    reciprocity,
    singleOnly
  } = input;

  // Base population (N)
  const N = location.population;
  
  // Gender ratio factor (fw) - assuming looking for opposite gender
  const fw = location.femaleRatio;
  
  // Location factor (fL) - already filtered by location selection
  const fL = 1.0;
  
  // Age appropriateness factor (fA)
  const fA = ageRange.factor;
  
  // University education factor (fU)
  const fU = education.factor;
  
  // Physical attractiveness factor (fB)
  const fB = attractiveness.value;
  
  // Personality match factor (fP) - geometric mean of selected traits
  const fP = calculatePersonalityFactor(personalityTags);
  
  // Reciprocity factor (fR) - probability they like you back
  const fR = reciprocity.value;
  
  // Single status factor (fS)
  const fS = singleOnly ? 0.4 : 1.0; // Approximately 40% of population is single

  // Final calculation: G = N × fw × fL × fA × fU × fB × fP × fR × fS
  const G = N * fw * fL * fA * fU * fB * fP * fR * fS;

  // Generate calculation steps for educational display
  const steps = generateCalculationSteps({
    N, fw, fL, fA, fU, fB, fP, fR, fS
  });

  return {
    finalNumber: Math.round(G),
    exactNumber: G,
    steps,
    formula: 'G = N × fw × fL × fA × fU × fB × fP × fR × fS',
    input
  };
}

/**
 * Calculates personality match factor using geometric mean
 * 
 * Geometric Mean Formula: (Π(xi))^(1/n)
 * This ensures that having many requirements significantly reduces probability
 * 
 * @param tags - Array of selected personality tags
 * @returns Probability factor between 0 and 1
 * 
 * Time Complexity: O(n) where n = number of personality tags selected
 * Space Complexity: O(1)
 */
function calculatePersonalityFactor(tags: PersonalityTag[]): number {
  if (tags.length === 0) return 1.0;
  
  // Geometric mean: multiply all factors, then take nth root
  const product = tags.reduce((acc, tag) => acc * tag.factor, 1);
  return Math.pow(product, 1 / tags.length);
}

/**
 * Generates human-readable calculation steps
 * 
 * @param params - All calculation parameters
 * @returns Array of steps showing the filtering process
 * 
 * Time Complexity: O(1) - Fixed number of steps
 * Space Complexity: O(1)
 */
function generateCalculationSteps(params: {
  N: number;
  fw: number;
  fL: number;
  fA: number;
  fU: number;
  fB: number;
  fP: number;
  fR: number;
  fS: number;
}): CalculationStep[] {
  const { N, fw, fL, fA, fU, fB, fP, fR, fS } = params;
  
  return [
    {
      label: 'Total Population (N)',
      symbol: 'N',
      value: N,
      percentage: 100,
      description: 'Base population in selected location'
    },
    {
      label: 'Opposite Gender Ratio (fw)',
      symbol: 'fw',
      value: fw,
      percentage: fw * 100,
      description: 'Percentage of target gender in population',
      runningTotal: N * fw
    },
    {
      label: 'Age Range Factor (fA)',
      symbol: 'fA',
      value: fA,
      percentage: fA * 100,
      description: 'Percentage within desired age range',
      runningTotal: N * fw * fA
    },
    {
      label: 'Education Level (fU)',
      symbol: 'fU',
      value: fU,
      percentage: fU * 100,
      description: 'Percentage with required education',
      runningTotal: N * fw * fA * fU
    },
    {
      label: 'Attractiveness Standard (fB)',
      symbol: 'fB',
      value: fB,
      percentage: fB * 100,
      description: 'Percentage meeting attractiveness criteria',
      runningTotal: N * fw * fA * fU * fB
    },
    {
      label: 'Personality Match (fP)',
      symbol: 'fP',
      value: fP,
      percentage: fP * 100,
      description: 'Probability of personality compatibility',
      runningTotal: N * fw * fA * fU * fB * fP
    },
    {
      label: 'Mutual Attraction (fR)',
      symbol: 'fR',
      value: fR,
      percentage: fR * 100,
      description: 'Probability they like you back',
      runningTotal: N * fw * fA * fU * fB * fP * fR
    },
    {
      label: 'Single Status (fS)',
      symbol: 'fS',
      value: fS,
      percentage: fS * 100,
      description: 'Percentage currently single',
      runningTotal: N * fw * fA * fU * fB * fP * fR * fS
    }
  ];
}

/**
 * Determines humor category based on result magnitude
 * 
 * @param result - Calculated number of potential partners
 * @returns HumorCategory with title, text and color
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function getHumorCategory(result: number): HumorCategory {
  if (result === 0) {
    return {
      level: 'impossible',
      title: '💔 Love Impossible',
      text: 'According to your criteria, this person may not exist in this universe... Consider adjusting your standards? Or perhaps prepare for interdimensional dating?',
      color: '#ff4444',
      emoji: '🌌'
    };
  }
  
  if (result < 1) {
    return {
      level: 'cosmic_rare',
      title: '🚀 Cosmic Level Rare',
      text: `Only ${(result * 1000).toFixed(1)} people on Earth match your criteria. Time to start learning astronomy and expand your search to Mars!`,
      color: '#9b59b6',
      emoji: '🪐'
    };
  }
  
  if (result < 10) {
    return {
      level: 'extremely_rare',
      title: '🌍 Extremely Rare',
      text: 'Rarer than seeing a shooting star! Keep your telescope handy at all times.',
      color: '#e74c3c',
      emoji: '💎'
    };
  }
  
  if (result < 100) {
    return {
      level: 'diamond',
      title: '✨ Diamond Level',
      text: 'Not many, but true love is worth the wait. Try spending more time at libraries and coffee shops!',
      color: '#f39c12',
      emoji: '💎'
    };
  }
  
  if (result < 1000) {
    return {
      level: 'gold',
      title: '🌟 Gold Level Opportunity',
      text: 'Decent odds! Keep an open mind, your soulmate is waiting somewhere.',
      color: '#f1c40f',
      emoji: '🏆'
    };
  }
  
  if (result < 10000) {
    return {
      level: 'silver',
      title: '⭐ Silver Level Selection',
      text: 'Plenty of fish in the sea! Remember, quality over quantity.',
      color: '#95a5a6',
      emoji: '🥈'
    };
  }
  
  return {
    level: 'bronze',
    title: '🌈 Bronze Level Ocean',
    text: 'Wow! So many matches—your standards might be too loose. Consider raising your expectations to find someone truly compatible!',
    color: '#3498db',
    emoji: '🥉'
  };
}

// Type definitions for humor response
export interface HumorCategory {
  level: string;
  title: string;
  text: string;
  color: string;
  emoji: string;
}

/**
 * Validates user input before calculation
 * 
 * @param input - User input to validate
 * @returns ValidationResult with success status and error message if any
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export function validateInput(input: Partial<DrakeInput>): ValidationResult {
  if (!input.location) {
    return { valid: false, error: 'Location is required' };
  }
  
  if (!input.ageRange) {
    return { valid: false, error: 'Age range is required' };
  }
  
  if (!input.education) {
    return { valid: false, error: 'Education level is required' };
  }
  
  if (input.attractiveness === undefined || input.attractiveness === null) {
    return { valid: false, error: 'Attractiveness standard is required' };
  }
  
  if (!input.reciprocity) {
    return { valid: false, error: 'Reciprocity level is required' };
  }
  
  return { valid: true };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}