"use client";
import { useState } from "react";
import loveScore from "@/algorithms/loveScore";
import { motion, AnimatePresence } from "framer-motion";

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
    const percentage = loveScore(name1, name2);
    setResult(percentage);
  };

  const getMessage = (percentage) => {
    if (percentage > 90) return "Made for each other 💖";
    if (percentage > 60) return "Strong Connection 💕";
    return "Keep Trying 😅";
  };

  return (
    <div className="text-center mt-12">
      <h1>Love Compatibility Calculator 💘</h1>

      {/* Name 1 */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          placeholder="Enter first name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          style={{
            paddingRight: "90px",
            background: "white",
            color: "black",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px"
          }}
        />

        {name1 && (
          <button
            onClick={() => setName1("")}
            style={{
              position: "absolute",
              right: "6px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#ff4d88",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ❤️ Remove
          </button>
        )}
      </div>

      <br /><br />

      {/* Name 2 */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          placeholder="Enter second name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          style={{
            paddingRight: "90px",
            background: "white",
            color: "black",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px"
          }}
        />

        {name2 && (
          <button
            onClick={() => setName2("")}
            style={{
              position: "absolute",
              right: "6px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#ff4d88",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ❤️ Remove
          </button>
        )}
      </div>

      <br /><br />

      {/* Animated Calculate Button */}
      <motion.button
        onClick={calculateLove}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          background: "#ff4d88",
          color: "white",
          border: "none",
          padding: "10px 22px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "16px"
        }}
      >
        💘 Calculate Love
      </motion.button>

      {/* 🌸 BEAUTIFUL RESULT ANIMATION */}
      <AnimatePresence>
        {result !== null && (
          <motion.div
            key="love-result"
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            style={{ marginTop: "20px" }}
          >
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              style={{
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              💘 {result}% Compatible
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{ fontSize: "18px" }}
            >
              {getMessage(result)}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explanation Section */}
      <hr style={{ margin: "40px 0" }} />

      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        <h2>How This Love Algorithm Works 💡</h2>

        <p>
          This calculator uses a simple algorithm to estimate compatibility
          between two names.
        </p>

        <ul>
          <li>Both names are combined into one string.</li>
          <li>Each character is converted into its ASCII value.</li>
          <li>All values are summed.</li>
          <li>The total is taken modulo 101 to generate a percentage.</li>
        </ul>

        <p><strong>Time Complexity:</strong> O(n)</p>
        <p>
          Where <strong>n</strong> is the total length of both names combined.
        </p>
      </div>
    </div>
  );
}
