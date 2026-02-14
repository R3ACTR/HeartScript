/**
 * Drake Equation Love Calculator - Algorithm Entry Point
 * 
 * This module exports all functionality for the Drake Equation love calculator,
 * implementing the mathematical model for estimating potential romantic partners.
 * 
 * Usage:
 * ```typescript
 * import { calculatePotentialPartners, getHumorCategory } from './algorithms/drake-equation';
 * 
 * const result = calculatePotentialPartners({
 *   location: LOCATIONS['hong-kong'],
 *   ageRange: AGE_RANGES['24-30'],
 *   // ... other parameters
 * });
 * ```
 */

// Core algorithm functions
export {
  calculatePotentialPartners,
  getHumorCategory,
  validateInput,
  type HumorCategory,
  type ValidationResult
} from './drakeEquation';

// Data types and constants
export {
  // Types
  type LocationData,
  type AgeRange,
  type EducationLevel,
  type AttractivenessLevel,
  type ReciprocityLevel,
  type PersonalityTag,
  type CalculationStep,
  type DrakeInput,
  type DrakeResult,
  
  // Constants
  LOCATIONS,
  AGE_RANGES,
  EDUCATION_LEVELS,
  ATTRACTIVENESS_LEVELS,
  RECIPROCITY_LEVELS,
  PERSONALITY_TAGS,
  DEFAULT_CONFIG
} from './drakeData';