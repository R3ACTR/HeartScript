"use client";

import { useState, useRef } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, MessageCircle, Heart, ArrowLeft, Send, Copy, Check } from "lucide-react";

export default function ValentineCardGenerator() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [showCopied, setShowCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState("serif");
  const [showEmoji, setShowEmoji] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
  };

  const handleClearMessage = () => setMessage("");

  const onEmojiClick = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const createDownloadCard = () => {
    const themeGradients: Record<string, string> = {
      romantic: "linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark: "linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel: "linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)",
    };

    const alignMap: Record<string,string> = {
      left:"flex-start",
      center:"center",
      right:"flex-end"
    };

    const textAlignMap: Record<string,string> = {
      left:"left",
      center:"center",
      right:"right"
    };

    const card = document.createElement("div");
    card.style.cssText = `
      position:fixed;
      left:-9999px;
      width:400px;
      height:500px;
      border-radius:16px;
      overflow:hidden;
      background:${themeGradients[theme]};
    `;

    card.innerHTML = `
      <div style="
        position:absolute;
        inset:0;
        display:flex;
        flex-direction:column;
        align-items:${alignMap[alignment]};
        justify-content:center;
        text-align:${textAlignMap[alignment]};
        color:white;
        padding:40px;
        font-family:'Playfair Display', serif;
      ">
        <div style="font-size:48px;margin-bottom:20px;">❤️</div>

        <h2 style="font-size:36px;font-weight:bold;margin-bottom:20px;">
          Dear <span style="font-style:italic;text-decoration:underline;">${recipient || "Someone Special"}</span>,
        </h2>

        <p style="font-size:16px;line-height:1.6;max-width:300px;margin-bottom:30px;font-family:${font};">
          ${message || "Your beautiful message will appear here..."}
        </p>

        <div style="font-style:italic;font-size:20px;">With Love ✨</div>
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

  const handleWhatsApp = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;

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
      console.error("WhatsApp sharing failed:", error);
      alert("Failed to prepare card for WhatsApp.");
    } finally {
      setIsGenerating(false);
    }
  };

  const createDownloadCard = () => {
    const themeGradients: Record<string, string> = {
      romantic:
        "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #800020 100%)",
      dark:
        "linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)",
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
          Dear <span style="font-style: italic; text-decoration: underline;">
          ${recipient || "Someone Special"}
          </span>,
        </h2>

      const canvas = await html2canvas(downloadCard, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(downloadCard);

      const imageData = canvas.toDataURL("image/png");
      
      // Copy image to clipboard
      const response = await fetch(imageData);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Failed to copy to clipboard. Please try downloading instead.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
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
      
      const link = document.createElement("a");
      link.download = `valentine-card-${recipient || "card"}.png`;
      link.href = imageData;
      link.click();
      
      alert("Card image downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
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

      const imageData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [400, 500]
      });
      
      pdf.addImage(imageData, "PNG", 0, 0, 400, 500);
      pdf.save(`valentine-card-${recipient || "card"}.pdf`);
      
      alert("Card PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to download PDF.");
    } finally {
      setIsGenerating(false);
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

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-display text-5xl font-bold text-gray-900 mb-3">
                Create Your<br/>Valentine Card
              </h1>
              <p className="text-gray-600">
                Craft a message straight from the heart.
              </p>
            </div>

            <div>
              <input
                autoFocus
                value={recipient}
                onChange={(e)=>setRecipient(e.target.value)}
                placeholder="Recipient Name"
                className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
              />
            </div>

            <div>
              <textarea
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Personal Message"
                maxLength={500}
                rows={5}
                className="px-4 py-4 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none resize-none"
              />
            </div>

            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="romantic">Romantic</option>
              <option value="dark">Dark Love</option>
              <option value="pastel">Pastel Dream</option>
            </select>

            {/* Font */}
            <select
              value={font}
              onChange={(e)=>setFont(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 focus:border-[#800020] outline-none"
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans</option>
              <option value="cursive">Cursive</option>
              <option value="monospace">Monospace</option>
            </select>

            {/* Alignment */}
            <div>
              <div className="flex gap-3">
                {["left","center","right"].map((align)=>(
                  <button
                    key={align}
                    onClick={()=>setAlignment(align as "left" | "center" | "right")}
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
                className="flex-1 bg-[#800020] hover:bg-[#630019] text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50"
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
            font={font}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="w-full max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-6">
            Preview Your Card
          </h1>

          <div className="flex justify-center mb-8">
            <CardPreview
              recipient={recipient}
              message={message}
              theme={theme}
              alignment={alignment}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setStep(1)}
              className="px-8 py-4 border rounded-xl"
            >
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="px-8 py-4 bg-[#800020] text-white rounded-xl"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="w-full max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-6">
            Share Your Love
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={handleDownloadImage} className="p-8 border rounded-xl">
              <Download size={40} className="mx-auto mb-2" />
              Download PNG
            </button>

            <button onClick={handleDownloadPDF} className="p-8 border rounded-xl">
              <FileText size={40} className="mx-auto mb-2" />
              Download PDF
            </button>

            <button onClick={handleEmail} className="p-8 border rounded-xl">
              <Mail size={40} className="mx-auto mb-2" />
              Email
      {/* STEP 2: PREVIEW */}
      {step === 2 && (
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
              Preview Your Card
            </h2>
            <p className="text-gray-600">
              Here&apos;s how your Valentine card will look
            </p>
          </div>

          {/* Full Card Preview */}
          <div ref={cardRef} className="flex justify-center mb-8">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-[0_0_60px_rgba(244,63,94,0.35)]">
              {/* Theme Gradient */}
              <div className={`absolute inset-0 ${
                theme === 'romantic' ? 'bg-gradient-to-br from-[#ec4899] via-[#f43f5e] to-[#800020]' :
                theme === 'dark' ? 'bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#000000]' :
                'bg-gradient-to-br from-[#fbcfe8] via-[#e9d5ff] to-[#bfdbfe]'
              }`} />
              
              {/* Dots Overlay */}
              <div className="absolute inset-0 opacity-15" 
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Card Content */}
              <div className={`absolute inset-0 flex flex-col justify-center text-white px-10 py-12 ${
                alignment === 'left' ? 'text-left items-start' :
                alignment === 'right' ? 'text-right items-end' :
                'text-center items-center'
              }`}>
                <div className="mb-6 text-4xl animate-bounce">❤️</div>
                
                <h2 className="font-serif text-4xl font-bold leading-snug mb-6">
                  Dear{" "}
                  <span className="italic underline decoration-rose-200 underline-offset-4">
                    {recipient}
                  </span>
                  ,
                </h2>

                <p className="text-lg opacity-95 leading-relaxed max-w-sm mb-8">
                  {message}
                </p>

                <div className="italic text-xl opacity-95">
                  With Love ✨
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setStep(1)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Edit Card
            </button>

            <button
              onClick={handleDownloadImage}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white font-semibold rounded-xl transition"
            >
              <Download className="w-5 h-5" />
              Download Image
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white font-semibold rounded-xl transition"
            >
              <FileText className="w-5 h-5" />
              Download PDF
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#800020] hover:bg-[#630019] text-white font-bold rounded-xl shadow-lg transition"
            >
              Send Card
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

function Step({ number, label, active }: { number: number; label: string; active: boolean }){
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
