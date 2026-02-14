"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";

export default function ValentineCardGenerator() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic"); // default theme

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 w-full max-w-6xl mx-auto">

      {/* STEP BAR */}
      <div className="w-full max-w-3xl mb-12">
        <div className="relative flex justify-between items-center text-sm font-semibold text-gray-500">

          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
          <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-[#800020] -z-10" />

          <Step number={1} label="Personalize" active />
          <Step number={2} label="Preview" />
          <Step number={3} label="Send" />

        </div>
      </div>


      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">

          <div>
            <h1 className="font-display text-5xl font-bold text-gray-900 mb-3">
              Create Your<br />Valentine Card
            </h1>

            <p className="text-gray-600">
              Craft a message straight from the heart.
            </p>
          </div>


          {/* Recipient */}
          <input
            value={recipient}
            onChange={(e)=>setRecipient(e.target.value)}
            placeholder="Recipient Name"
            className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
          />


          {/* Message */}
          <div>
            <textarea
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              placeholder="Personal Message"
              maxLength={500}
              rows={5}
              className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none resize-none"
            />

            <div className="text-right text-xs text-gray-400 mt-1">
              {message.length} / 500 characters
            </div>
          </div>


          {/* Theme Selector */}
          <div>
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Select Theme
            </span>

            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="romantic">Romantic</option>
              <option value="dark">Dark Love</option>
              <option value="pastel">Pastel Dream</option>
            </select>
          </div>


          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 rounded-xl"
            >
              Reset
            </button>

            <button className="flex-1 bg-[#800020] hover:bg-[#630019] text-white font-bold py-4 rounded-xl shadow-lg">
              Next: Preview →
            </button>
          </div>

        </div>


        {/* RIGHT SIDE PREVIEW */}
        <CardPreview
          recipient={recipient}
          message={message}
          theme={theme}
        />

      </div>
    </main>
  );
}



function Step({ number, label, active }: any){
  return(
    <div className="flex flex-col items-center gap-2 bg-[#FFFBF7] px-2">

      <div className={`w-8 h-8 rounded-full flex items-center justify-center
      ${active ? "bg-[#800020] text-white" : "bg-gray-200 text-gray-500"}`}>
        {number}
      </div>

      <span className={`${active ? "text-[#800020] font-bold" : ""}`}>
        {label}
      </span>

    </div>
  );
}
