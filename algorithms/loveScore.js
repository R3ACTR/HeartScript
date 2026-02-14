/**
 * Love Score Calculator
 *
 * Logic:
 * - Sanitize input (letters only)
 * - Use name lengths
 * - Deterministic calculation
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function sanitize(value) {
  return value.trim().toLowerCase().replace(/[^a-z]/g, "");
}

function loveScore(name1, name2) {
  const clean1 = sanitize(name1);
  const clean2 = sanitize(name2);

  // Defensive guard
  if (!clean1 || !clean2) {
    return 0;
  }

  const length1 = clean1.length;
  const length2 = clean2.length;

  const score = ((length1 + length2) * 7) % 101;

  return score;
}

export default loveScore;
