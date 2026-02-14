"use client";

import { useState, useEffect } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, Heart, ArrowLeft, Send, Copy, Check } from "lucide-react";

/* ---------------- LOVE QUOTES ---------------- */
const loveQuotes: string[] = [
  "You are my today and all of my tomorrows ❤️",
  "Every love story is beautiful, but ours is my favorite 💕",
  "You make my heart smile 😊",
  "With you, every moment is magical ✨",
  "I fall for you more and more every day 💖",
  "You are the best thing that ever happened to me 💘"
];

export default function ValentineCardGenerator() {

  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [font, setFont] = useState("serif");

  const [stickers, setStickers] = useState<{ id:number;x:number;y:number;emoji:string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [showCopied, setShowCopied] = useState(false);
  const [showSaved, setShowSaved] = useState(false); // ✅ new state

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const stickerOptions = ["❤️","🌹","⭐","💖","💘","✨","🎀","💐"];

  /* LOAD SAVED DRAFT */
  useEffect(()=>{
    const saved = localStorage.getItem("cardDraft");
    if(!saved) return;

    const data = JSON.parse(saved);

    setRecipient(data.recipient ?? "");
    setMessage(data.message ?? "");
    setTheme(data.theme ?? "romantic");
    setAlignment(data.alignment ?? "center");
    setFont(data.font ?? "serif");
    setStickers(data.stickers ?? []);
    setAudioURL(data.audioURL ?? null);
  },[]);

  /* AUTO SAVE */
  useEffect(()=>{
    const draft={
      recipient,
      message,
      theme,
      alignment,
      font,
      stickers,
      audioURL
    };
    localStorage.setItem("cardDraft",JSON.stringify(draft));
  },[recipient,message,theme,alignment,font,stickers,audioURL]);

  /* MANUAL SAVE */
  const handleManualSave=()=>{
    const draft={
      recipient,
      message,
      theme,
      alignment,
      font,
      stickers,
      audioURL
    };

    localStorage.setItem("cardDraft",JSON.stringify(draft));

    setShowSaved(true);
    setTimeout(()=>setShowSaved(false),2000);
  };

  /* RESET */
  const handleReset=()=>{
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
    setStickers([]);
    setAudioURL(null);
    localStorage.removeItem("cardDraft");
  };

  /* STICKERS */
  const addSticker=(emoji:string)=>{
    setStickers(prev=>[...prev,{id:Date.now(),x:120,y:120,emoji}]);
  };

  const moveSticker=(id:number,x:number,y:number)=>{
    setStickers(prev=>prev.map(s=>s.id===id?{...s,x,y}:s));
  };

  /* QUOTE */
  const generateRandomQuote=()=>{
    const randomIndex=Math.floor(Math.random()*loveQuotes.length);
    setMessage(loveQuotes[randomIndex]);
  };

  /* AUDIO */
  const startRecording=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder=new MediaRecorder(stream);
      const chunks:BlobPart[]=[];

      recorder.ondataavailable=e=>chunks.push(e.data);

      recorder.onstop=()=>{
        const blob=new Blob(chunks,{type:"audio/webm"});
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }catch{
      alert("Microphone permission denied");
    }
  };

  const stopRecording=()=>{
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const handleAudioUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if(file){
      setAudioBlob(file);
      setAudioURL(URL.createObjectURL(file));
    }
  };

  /* SHARE */
  const generateShareLink=()=>{
    const params=new URLSearchParams({
      to:recipient,
      msg:message,
      theme,
      align:alignment,
      font
    });
    return `${window.location.origin}/card/view?${params}`;
  };

  const handleCopyLink=async()=>{
    const link=generateShareLink();
    await navigator.clipboard.writeText(link);
    setShowCopied(true);
    setTimeout(()=>setShowCopied(false),2000);
  };

  /* CANVAS */
  const createDownloadCard=()=>{
    const gradients:any={
      romantic:"linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark:"linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel:"linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)"
    };

    const card=document.createElement("div");
    card.style.cssText=`position:fixed;left:-9999px;width:400px;height:500px;border-radius:16px;background:${gradients[theme]};color:white;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:${font};padding:40px;text-align:center;`;

    card.innerHTML=`
      <h2>Dear ${recipient||"Someone Special"}</h2>
      <p>${message||"Your message..."}</p>
      <div>With Love ❤️</div>
    `;
    return card;
  };

  const renderCanvas=async()=>{
    const html2canvas=(await import("html2canvas")).default;
    const node=createDownloadCard();
    document.body.appendChild(node);
    const canvas=await html2canvas(node,{scale:2});
    document.body.removeChild(node);
    return canvas;
  };

  const downloadImage=async(type:"png"|"jpeg")=>{
    setIsGenerating(true);
    const canvas=await renderCanvas();
    const link=document.createElement("a");
    link.download=`card.${type==="jpeg"?"jpg":"png"}`;
    link.href=canvas.toDataURL(`image/${type}`,1);
    link.click();
    setIsGenerating(false);
  };

  const downloadPDF=async()=>{
    setIsGenerating(true);
    const canvas=await renderCanvas();
    const {jsPDF}=await import("jspdf");
    const pdf=new jsPDF();
    pdf.addImage(canvas.toDataURL(),"PNG",10,10,180,220);
    pdf.save("card.pdf");
    setIsGenerating(false);
  };

  const handleEmail=()=>{
    window.location.href=`mailto:?subject=Valentine Card&body=${message}`;
  };

  /* UI */
  return(
  <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto min-h-screen">

{/* STEP BAR */}
<div className="w-full max-w-2xl mb-12">
<div className="relative flex justify-between items-center">
<div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"/>
<div className="absolute top-5 left-0 h-1 bg-[#800020] rounded-full transition-all"
style={{width:step===1?"0%":step===2?"50%":"100%"}}/>
<Step number={1} label="Personalize" active={step>=1}/>
<Step number={2} label="Preview" active={step>=2}/>
<Step number={3} label="Send" active={step>=3}/>
</div>
</div>

{/* STEP 1 */}
{step===1&&(
<div className="grid lg:grid-cols-2 gap-12 w-full">

<div className="flex flex-col gap-6">

<button onClick={generateRandomQuote}
className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#630019]">
💌 Generate Random Love Quote
</button>

<input value={recipient} onChange={e=>setRecipient(e.target.value)}
placeholder="Recipient Name"
className="px-4 py-4 border rounded"/>

<textarea value={message} onChange={e=>setMessage(e.target.value)}
rows={5}
placeholder="Your Message"
className="px-4 py-4 border-2 rounded-lg resize-none"/>

<div className="flex gap-3 flex-wrap">
<button onClick={startRecording} disabled={isRecording}
className="px-4 py-2 bg-red-500 text-white rounded">Record</button>

<button onClick={stopRecording} disabled={!isRecording}
className="px-4 py-2 bg-gray-700 text-white rounded">Stop</button>

<label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
Upload
<input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden"/>
</label>
</div>

{audioURL && <audio controls src={audioURL} />}

<select value={theme} onChange={e=>setTheme(e.target.value)}
className="px-4 py-3 border rounded">
<option value="romantic">Romantic</option>
<option value="dark">Dark</option>
<option value="pastel">Pastel</option>
</select>

<div className="flex gap-4">
<button onClick={handleManualSave}
className="flex-1 border py-3 rounded flex items-center justify-center gap-2">
{showSaved ? <Check size={18}/> : "Save Draft"}
</button>

<button onClick={handleReset} className="flex-1 border py-3 rounded">Reset</button>

<button disabled={!recipient||!message}
onClick={()=>setStep(2)}
className="flex-1 bg-[#800020] text-white py-3 rounded disabled:opacity-50">
Continue →
</button>
</div>

</div>

<CardPreview {...{recipient,message,theme,alignment,font,stickers,moveSticker}}/>

</div>
)}

{/* STEP 2 */}
{step===2&&(
<div className="text-center">

<div className="flex gap-3 justify-center mb-6 flex-wrap">
{stickerOptions.map(s=>(
<button key={s} onClick={()=>addSticker(s)} className="text-2xl">{s}</button>
))}
</div>

<CardPreview {...{recipient,message,theme,alignment,font,stickers,moveSticker}}/>

<div className="flex gap-4 justify-center mt-8">
<button onClick={()=>setStep(1)} className="border px-6 py-3"><ArrowLeft/> Back</button>
<button onClick={()=>setStep(3)} className="bg-[#800020] text-white px-6 py-3">
Send <Send/>
</button>
</div>

</div>
)}

{/* STEP 3 */}
{step===3&&(
<div className="text-center max-w-xl">

<Heart className="mx-auto w-12 h-12 text-[#800020] mb-4 animate-pulse"/>

<h2 className="text-3xl font-bold mb-2">Send Your Card</h2>
<p className="mb-8 text-gray-600">Choose how to share it</p>

<div className="grid grid-cols-2 gap-4">

<button onClick={handleEmail} className="border p-6 rounded"><Mail/> Email</button>

<button onClick={handleCopyLink} className="border p-6 rounded">
{showCopied?<Check/>:<Copy/>}
{showCopied?"Copied!":"Copy Link"}
</button>

<button onClick={()=>downloadImage("png")} className="border p-6 rounded"><Download/> PNG</button>
<button onClick={()=>downloadImage("jpeg")} className="border p-6 rounded"><Download/> JPG</button>

<button onClick={downloadPDF} className="border p-6 rounded"><FileText/> PDF</button>

</div>

<button onClick={()=>setStep(2)} className="mt-8 underline">← Back</button>

</div>
)}

</main>
);
}

function Step({number,label,active}:{number:number,label:string,active:boolean}){
return(
<div className="flex flex-col items-center gap-2 z-10">
<div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
${active?"bg-[#800020] text-white":"bg-white border text-gray-500"}`}>
{number}
</div>
<span className={active?"text-[#800020]":"text-gray-500"}>{label}</span>
</div>
);
}
