"use client";
import { useState } from "react";

/*
Love Compatibility Calculator
Time Complexity: O(n)
Where n = length of combined names

Logic:
- Combine both names
- Convert characters to ASCII
- Sum them
- Modulo 101 to get percentage
*/

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const calculateLove = () => {
    const combined = (name1 + name2).toLowerCase();
    let score = 0;

    for (let i = 0; i < combined.length; i++) {
      score += combined.charCodeAt(i);
    }

    const percentage = score % 101;
    setResult(percentage);
  };

  const getMessage = (percentage) => {
    if (percentage > 90) return "Made for each other 💖";
    if (percentage > 60) return "Strong Connection 💕";
    return "Keep Trying 😅";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Love Compatibility Calculator 💘</h1>

      <input
        type="text"
        placeholder="Enter first name"
        onChange={(e) => setName1(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter second name"
        onChange={(e) => setName2(e.target.value)}
      />
      <br /><br />

      <button onClick={calculateLove}>Calculate Love</button>

      {result !== null && (
        <div>
          <h2>{result}% Compatible</h2>
          <p>{getMessage(result)}</p>
        </div>
      )}
    </div>
  );
}

