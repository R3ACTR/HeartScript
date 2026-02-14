"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail } from "lucide-react";

export default function ValentineCardGenerator() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
  };

  const handleClearMessage = () => {
    setMessage("");
  };

  const handleDownloadImage = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(downloadCard);

      const link = document.createElement("a");
      link.download = `valentine-card-${recipient || "card"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(downloadCard);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`valentine-card-${recipient || "card"}.pdf`);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const createDownloadCard = () => {
    const themeGradients: Record<string, string> = {
      romantic:
        "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #800020 100%)",
      dark: "linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)",
      pastel:
        "linear-gradient(135deg, #fbcfe8 0%, #e9d5ff 50%, #bfdbfe 100%)",
    };

    const alignMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    const textAlignMap: Record<string, string> = {
      left: "left",
      center: "center",
      right: "right",
    };

    const card = document.createElement("div");
    card.style.cssText = `
      position: fixed;
      left: -9999px;
      width: 400px;
      height: 500px;
      border-radius: 16px;
      overflow: hidden;
      background: ${themeGradients[theme]};
    `;

    card.innerHTML = `
      <div style="
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: ${alignMap[alignment]};
        justify-content: center;
        text-align: ${textAlignMap[alignment]};
        color: white;
        padding: 40px;
        font-family: 'Playfair Display', serif;
      ">
        <div style="font-size: 48px; margin-bottom: 20px;">❤️</div>

        <h2 style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
          Dear <span style="font-style: italic; text-decoration: underline;">${recipient || "Someone Special"}</span>,
        </h2>

        <p style="font-size: 16px; line-height: 1.6; max-width: 300px; margin-bottom: 30px;">
          ${message || "Your beautiful message will appear here..."}
        </p>

        <div style="font-style: italic; font-size: 20px;">With Love ✨</div>
      </div>
    `;

    return card;
  };

  const handleEmail = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(downloadCard);

      const imageData = canvas.toDataURL("image/png");

      const subject = encodeURIComponent(`Valentine Card for ${recipient}`);
      const body = encodeURIComponent(
        `Dear ${recipient},\n\n${message}\n\nWith Love ❤️`
      );

      window.location.href = `mailto:?subject=${subject}&body=${body}`;

      const link = document.createElement("a");
      link.download = `valentine-card-${recipient || "card"}.png`;
      link.href = imageData;
      link.click();

      alert("Email client opened! The card image has been downloaded.");
    } catch (error) {
      console.error("Email failed:", error);
      alert("Failed to prepare email.");
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 w-full max-w-6xl mx-auto">

      {/* STEP BAR */}
      <div className="w-full max-w-3xl mb-12">
        <div className="relative flex justify-between items-center text-sm font-semibold text-gray-500">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#800020] -z-10 transition-all duration-500"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />
          <Step number={1} label="Personalize" active={step >= 1} />
          <Step number={2} label="Preview" active={step >= 2} />
          <Step number={3} label="Send" active={step >= 3} />
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">

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
            <div>
              <input
                autoFocus
                value={recipient}
                onChange={(e)=>setRecipient(e.target.value)}
                placeholder="Recipient Name"
                className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the name of the person receiving the card.
              </p>
            </div>

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

              <p className="text-sm text-gray-500 mt-1">
                Write a heartfelt message (max 500 characters).
              </p>

              {message && (
                <button
                  onClick={handleClearMessage}
                  className="mt-2 text-sm text-[#800020] hover:text-[#630019] font-semibold"
                >
                  ❤️ Clear Message
                </button>
              )}

              <div className="text-right text-xs text-gray-400 mt-1">
                {message.length} / 500 characters
              </div>
            </div>

            {/* Theme */}
            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="romantic">Romantic</option>
              <option value="dark">Dark Love</option>
              <option value="pastel">Pastel Dream</option>
            </select>

            {/* Alignment */}
            <div>
              <span className="text-sm font-medium text-gray-700 mb-2 block">
                Text Alignment
              </span>

              <div className="flex gap-3">
                {["left","center","right"].map((align)=>(
                  <button
                    key={align}
                    onClick={()=>setAlignment(align as any)}
                    className={`flex-1 py-3 rounded-lg border font-semibold capitalize transition
                    ${alignment===align
                      ? "bg-[#800020] text-white border-[#800020]"
                      : "bg-white border-gray-300 text-gray-600 hover:border-[#800020]"}`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 rounded-xl"
              >
                Reset
              </button>

              <button 
                onClick={() => setStep(2)}
                disabled={!recipient || !message}
                className="flex-1 bg-[#800020] hover:bg-[#630019] text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Preview →
              </button>
            </div>

          </div>

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
          />

        </div>
      )}
    </main>
  );
}

function Step({ number, label, active }: any){
  return(
    <div className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
      ${active ? "bg-[#800020] text-white" : "bg-gray-200 text-gray-500"}`}>
        {number}
      </div>
      <span className={`${active ? "text-[#800020] font-bold" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
}
