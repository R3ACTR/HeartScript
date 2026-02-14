# Drake Equation Love Calculator

## Overview

A mathematical love calculator based on the famous **Drake Equation** from astrophysics, adapted to estimate the number of potential romantic partners based on user-defined criteria.

**Live Demo:** `/drake-equation` route in the HeartScript application

## The Algorithm

### Original Drake Equation (Astrophysics)
N = R* × fp × ne × fl × fi × fc × L

### Love Adaptation
G = N × fw × fA × fU × fB × fP × fR × fS

| Factor | Description | Example Value |
|--------|-------------|---------------|
| N | Total population in location | 7,336,000 (Hong Kong) |
| fw | Target gender ratio | 0.538 (54% female) |
| fA | Age range factor | 0.10 (ages 24-30) |
| fU | Education level factor | 0.35 (university+) |
| fB | Attractiveness standard | 0.05 (top 5%) |
| fP | Personality compatibility | 0.40 (geometric mean) |
| fR | Reciprocity probability | 0.20 (20% chance) |
| fS | Single status filter | 0.40 (40% single) |

## Features

- **Interactive Form**: Select location, age, education, attractiveness standards
- **Personality Matching**: Multi-select personality traits with probability factors
- **Real-time Calculation**: Instant results with animated display
- **Step-by-Step Breakdown**: Educational view of each filtering step
- **Humor Ratings**: Fun result categories from "Cosmic Rare" to "Bronze Ocean"

## Time Complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| `calculatePotentialPartners()` | **O(1)** | Constant arithmetic operations |
| `calculatePersonalityFactor()` | O(n) | n = selected tags (max 15, effectively O(1)) |
| `generateCalculationSteps()` | **O(1)** | Fixed 8 steps |
| `validateInput()` | **O(1)** | Field validation |
| **Overall** | **O(1)** | Constant time for all practical inputs |

## Space Complexity

**O(1)** - Fixed memory allocation regardless of input size.

## Usage Example

```typescript
import { calculatePotentialPartners, LOCATIONS, AGE_RANGES, EDUCATION_LEVELS, ATTRACTIVENESS_LEVELS, PERSONALITY_TAGS, RECIPROCITY_LEVELS } from '@/algorithms/drake-equation';

const result = calculatePotentialPartners({
  location: LOCATIONS['hong-kong'],
  ageRange: AGE_RANGES['24-30'],
  education: EDUCATION_LEVELS['university'],
  attractiveness: ATTRACTIVENESS_LEVELS[2], // Top 5%
  personalityTags: [PERSONALITY_TAGS[0], PERSONALITY_TAGS[1]], // Humorous, Kind
  reciprocity: RECIPROCITY_LEVELS[2], // 20%
  singleOnly: true
});

console.log(result.finalNumber); // ~26 potential matches
console.log(result.steps);       // Detailed breakdown
Mathematical Notes: 

Geometric Mean for Personality: Using geometric mean (not arithmetic) prevents "requirement inflation" when selecting multiple traits.

Independence Assumption: Factors are treated as independent probabilities. In reality, some correlations exist (e.g., education and age).

Static Demographics: Population data is approximate and may not reflect real-time statistics.

References
Drake, F. (1965). "The Radio Search for Intelligent Extraterrestrial Life"
Backus, P. (2010). "Why I don't have a girlfriend: An application of the Drake Equation to love in the UK"