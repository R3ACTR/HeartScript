"use client";

import { useState, useRef } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, Heart, ArrowLeft, Send, Copy } from "lucide-react";
//new code 
const loveQuotes: string[] = [
  "You are my today and all of my tomorrows ❤️",
  "Every love story is beautiful, but ours is my favorite 💕",
  "You make my heart smile 😊",
  "With you, every moment is magical ✨",
  "I fall for you more and more every day 💖",
  "You are the best thing that ever happened to me 💘"
];
//


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

  const handleClearMessage = () => {
    setMessage("");
  };

  //new code
 const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
  };

//
  const createDownloadCard = () => {
    const themeGradients: Record<string,string> = {
      romantic:"linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark:"linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel:"linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)"
    };

    const alignMap = { left:"flex-start", center:"center", right:"flex-end" };
    const textAlignMap = { left:"left", center:"center", right:"right" };

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
      const canvas = await html2canvas(downloadCard, { scale: 2, backgroundColor: "#ffffff" });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");
      const subject = encodeURIComponent("Valentine Card for " + recipient);
      const body = encodeURIComponent("Dear " + recipient + ",\n\n" + message + "\n\nWith Love ❤️");
      window.location.href = "mailto:?subject=" + subject + "&body=" + body;
      const link = document.createElement("a");
      link.download = "valentine-card-" + (recipient || "card") + ".png";
      link.href = imageData;
      link.click();
      alert("Email client opened! Card image downloaded.");
    } catch {
      alert("Failed to prepare email.");
    }
  };

  const handleWhatsApp = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;
      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);
      const canvas = await html2canvas(downloadCard, { scale: 2, backgroundColor: "#ffffff" });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "valentine-card-" + (recipient || "card") + ".png";
      link.href = imageData;
      link.click();
      const text = encodeURIComponent("Dear " + recipient + ",\n" + message + "\n\nWith Love ❤️");
      window.open("https://wa.me/?text=" + text, "_blank");
      alert("Card downloaded! Share on WhatsApp.");
    } catch {
      alert("Failed to prepare card.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;
      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);
      const canvas = await html2canvas(downloadCard, { scale: 2, backgroundColor: "#ffffff" });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");
      const response = await fetch(imageData);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      alert("Failed to copy. Try downloading instead.");
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
      const canvas = await html2canvas(downloadCard, { scale: 2, backgroundColor: "#ffffff" });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "valentine-card-" + (recipient || "card") + ".png";
      link.href = imageData;
      link.click();
      alert("Card image downloaded!");
    } catch {
      alert("Download failed.");
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
      const canvas = await html2canvas(downloadCard, { scale: 2, backgroundColor: "#ffffff" });
      document.body.removeChild(downloadCard);
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [400, 500] });
      pdf.addImage(imageData, "PNG", 0, 0, 400, 500);
      pdf.save("valentine-card-" + (recipient || "card") + ".pdf");
      alert("Card PDF downloaded!");
    } catch {
      alert("PDF download failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">

      {/* STEP BAR - Improved */}
      <div className="w-full max-w-2xl mb-12">
        <div className="relative flex justify-between items-center">
          {/* Background line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />
          {/* Progress line */}
          <div 
            className="absolute top-5 left-0 h-1 bg-[#800020] rounded-full transition-all duration-500"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />
          {/* Step indicators */}
          <Step number={1} label="Personalize" active={step >= 1} />
          <Step number={2} label="Preview" active={step >= 2} />
          <Step number={3} label="Send" active={step >= 3} />
        </div>
      </div>

      {/* STEP 1 - Personalize */}
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full items-start">

          {/* Left Column - Form */}
          <div className="flex flex-col gap-6">

            

            

            {/* new code */}
            <button
  type="button"
  onClick={() => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
  }}
  className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#630019] transition text-sm font-semibold"
>
  💌 Generate Random Love Quote
</button>
          

            {/* Recipient */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Enter recipient's name"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#800020] focus:ring-0 outline-none transition"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your heartfelt message..."
                maxLength={500}
                rows={5}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#800020] focus:ring-0 outline-none transition resize-none"
              />
              
              {/* Emoji Button */}
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="absolute bottom-4 right-4 text-2xl hover:scale-110 transition"
              >
                😊
              </button>

              {/* Emoji Picker */}
              {showEmoji && (
                <div className="absolute z-50 right-0 mt-2 bg-white border-2 border-gray-100 rounded-xl p-3 shadow-xl">
                  <div className="grid grid-cols-6 gap-1">
                    {['❤️','😍','💕','💖','💗','💓','💞','💘','💝','🥰','😘','💋','🌹','🌷','💐','🌸','✨','🎁','💍','🎀','💌','🏩','👩‍❤️‍👨','👨‍❤️‍👨','👩‍❤️‍👩','💑','🤗','😻'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setMessage(prev => prev + emoji);
                          setShowEmoji(false);
                        }}
                        className="text-2xl hover:bg-pink-50 rounded-lg p-1 transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                {message && (
                  <button
                    onClick={handleClearMessage}
                    className="text-sm text-[#800020] hover:text-[#630019] font-medium"
                  >
                    Clear message
                  </button>
                )}
                <span className="text-xs text-gray-400 ml-auto">
                  {message.length}/500
                </span>
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'romantic', label: 'Romantic', color: 'from-pink-500 to-rose-600' },
                  { value: 'dark', label: 'Dark Love', color: 'from-gray-700 to-gray-900' },
                  { value: 'pastel', label: 'Pastel', color: 'from-pink-200 to-purple-200' }
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${theme === t.value ? 'border-[#800020] bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}
                  >
                    <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${t.color} mb-2`} />
                    <span className="text-sm font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
              <select 
                value={font} 
                onChange={e => setFont(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#800020] outline-none"
              >
                <option value="serif">Classic Serif</option>
                <option value="'Great Vibes',cursive">Elegant Script</option>
                <option value="'Dancing Script',cursive">Cute Script</option>
                <option value="'Pacifico',cursive">Fun Script</option>
              </select>
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
              <div className="grid grid-cols-3 gap-3">
                {['left', 'center', 'right'].map(a => (
                  <button
                    key={a}
                    onClick={() => setAlignment(a as "left" | "center" | "right")}
                    className={`py-3 rounded-xl border-2 font-medium capitalize transition ${alignment === a ? 'border-[#800020] bg-[#800020] text-white' : 'border-gray-200 hover:border-[#800020]'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleReset} 
                className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
              >
                Reset
              </button>
              <button 
                disabled={!recipient || !message}
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-[#800020] hover:bg-[#630019] text-white font-semibold rounded-xl shadow-lg shadow-pink-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Preview →
              </button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
          />
        </div>
      )}

      {/* STEP 2 - Preview */}
      {step === 2 && (
        <div className="w-full max-w-2xl text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Preview Your Card
          </h2>
          <p className="text-gray-600 mb-8">
            Here's how your Valentine card will look
          </p>

          <div className="flex justify-center mb-10">
            <CardPreview
              recipient={recipient}
              message={message}
              theme={theme}
              alignment={alignment}
              font={font}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setStep(1)} 
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Edit Card
            </button>

            <button 
              onClick={handleDownloadImage}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white font-semibold rounded-xl transition"
            >
              <Download className="w-5 h-5" />
              Download Image
            </button>

            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white font-semibold rounded-xl transition"
            >
              <FileText className="w-5 h-5" />
              Download PDF
            </button>

            <button 
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-8 py-3 bg-[#800020] hover:bg-[#630019] text-white font-bold rounded-xl shadow-lg shadow-pink-200 transition"
            >
              Send Card
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 - Send */}
      {step === 3 && (
        <div className="w-full max-w-2xl text-center">

          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6">
            <Heart className="w-10 h-10 text-[#800020] animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Send Your Card
          </h2>
          <p className="text-gray-600 mb-10">
            Choose how you want to deliver your heartfelt message
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <button
              onClick={handleEmail}
              className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-200 hover:border-[#800020] rounded-2xl transition group"
            >
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-[#800020] transition">
                <Mail className="w-7 h-7 text-red-500 group-hover:text-white" />
              </div>
              <span className="font-semibold">Email</span>
              <span className="text-sm text-gray-500">Send via email</span>
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={isGenerating}
              className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-200 hover:border-green-500 rounded-2xl transition group disabled:opacity-50"
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition">
                <Send className="w-7 h-7 text-green-500 group-hover:text-white" />
              </div>
              <span className="font-semibold">WhatsApp</span>
              <span className="text-sm text-gray-500">Share instantly</span>
            </button>

            <button
              onClick={handleCopyLink}
              disabled={isGenerating}
              className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-200 hover:border-[#800020] rounded-2xl transition group disabled:opacity-50"
            >
              <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center group-hover:bg-[#800020] transition">
                {showCopied ? (
                  <Check className="w-7 h-7 text-green-500" />
                ) : (
                  <Copy className="w-7 h-7 text-pink-500 group-hover:text-white" />
                )}
              </div>
              <span className="font-semibold">{showCopied ? "Copied!" : "Copy Image"}</span>
              <span className="text-sm text-gray-500">{showCopied ? "Ready to paste" : "Copy to clipboard"}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-200 hover:border-[#800020] rounded-2xl transition group"
            >
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-[#800020] transition">
                <Download className="w-7 h-7 text-purple-500 group-hover:text-white" />
              </div>
              <span className="font-semibold">Download</span>
              <span className="text-sm text-gray-500">Save as image</span>
            </button>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Preview
          </button>
        </div>
      )}
    </main>
  );
}

function Step({ number, label, active }: { number: number; label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${active ? 'bg-[#800020] text-white shadow-lg shadow-pink-300' : 'bg-white border-2 border-gray-300 text-gray-500'}`}>
        {number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-[#800020]' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}
