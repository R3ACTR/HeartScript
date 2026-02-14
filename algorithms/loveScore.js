function loveScore(name1, name2) {
  // remove spaces and normalize
  name1 = name1.trim();
  name2 = name2.trim();

  const length1 = name1.length;
  const length2 = name2.length;

  const score = ((length1 + length2) * 7) % 101;

  return score;
}

export default loveScore;
