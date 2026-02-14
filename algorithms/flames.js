/**
 * FLAMES Relationship Engine
 *
 * Responsibilities:
 * - Normalize names
 * - Detect common character matches
 * - Generate step-by-step match indices for animation
 * - Compute remaining character count
 * - Run FLAMES elimination logic
 *
 * Time Complexity: O(n²) worst case (character comparison)
 * Space Complexity: O(n)
 */

const FLAMES_MAP = {
  F: 'Friends',
  L: 'Lovers',
  A: 'Affection',
  M: 'Marriage',
  E: 'Enemy',
  S: 'Sibling'
};

const FLAMES_ARRAY = ['F', 'L', 'A', 'M', 'E', 'S'];

/**
 * Sanitizes input to keep only alphabetical characters.
 */
const sanitize = (value) => {
  return value.trim().toLowerCase().replace(/[^a-z]/g, '');
};

/**
 * Core logic to calculate FLAMES and generate animation steps.
 * @param {string} name1 
 * @param {string} name2 
 */
export const calculateFlames = (name1, name2) => {

  const n1 = sanitize(name1);
  const n2 = sanitize(name2);

  // Defensive guard: return neutral result if input invalid
  if (!n1 || !n2) {
    return {
      name1Letters: [],
      name2Letters: [],
      steps: [],
      remainingCount: 0,
      result: "Invalid Input"
    };
  }

  const name1Letters = n1.split('').map((char, i) => ({
    char,
    originalIndex: i,
    isCrossed: false,
    isMatch: false,
  }));

  const name2Letters = n2.split('').map((char, i) => ({
    char,
    originalIndex: i,
    isCrossed: false,
    isMatch: false,
  }));

  const steps = [];
  const name2UsedIndices = new Set();

  for (let i = 0; i < name1Letters.length; i++) {
    const char1 = name1Letters[i].char;

    for (let j = 0; j < name2Letters.length; j++) {
      if (name2UsedIndices.has(j)) continue;

      const char2 = name2Letters[j].char;

      if (char1 === char2) {
        name2UsedIndices.add(j);
        steps.push({
          name1Index: i,
          name2Index: j,
          char: char1
        });
        break;
      }
    }
  }

  const totalLength = n1.length + n2.length;
  const matches = steps.length * 2;
  const remainingCount = totalLength - matches;

  // Edge case: if everything cancels out
  if (remainingCount <= 0) {
    return {
      name1Letters,
      name2Letters,
      steps,
      remainingCount: 0,
      result: "Friends"
    };
  }

  let flames = [...FLAMES_ARRAY];
  let currentIndex = 0;

  while (flames.length > 1) {
    const removeIndex = (currentIndex + remainingCount - 1) % flames.length;
    flames.splice(removeIndex, 1);
    currentIndex = removeIndex;
  }

  const resultChar = flames[0];
  const result = FLAMES_MAP[resultChar];

  return {
    name1Letters,
    name2Letters,
    steps,
    remainingCount,
    result
  };
};
