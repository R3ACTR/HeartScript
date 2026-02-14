'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface CardDownloadButtonProps {
  cardElementId: string;
  cardTitle?: string;
}

export const CardDownloadButton: React.FC<CardDownloadButtonProps> = ({
  cardElementId,
  cardTitle = 'valentine-card',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsDownloading(true);
    setDownloadComplete(false);

    try {
      const cardElement = document.getElementById(cardElementId);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Capture the card with high quality
      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 0,
      });

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create image');
          }

          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().split('T')[0];
          link.download = `${cardTitle}-${timestamp}.${format}`;
          link.href = url;
          link.click();

          // Cleanup
          URL.revokeObjectURL(url);
          
          setDownloadComplete(true);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadComplete(false);
          }, 2000);
        },
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Failed to download card. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6">
      {/* Main Container */}
      <div className="relative flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EC] to-[#FFF5F7] rounded-2xl shadow-[0_8px_16px_rgba(139,21,56,0.1)] border border-[rgba(196,150,155,0.3)] overflow-hidden">
        
        {/* Paper Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,21,56,0.02) 2px, rgba(139,21,56,0.02) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,21,56,0.02) 2px, rgba(139,21,56,0.02) 4px)
            `
          }}
        />

        {/* Wax Seal */}
        <div className={`relative w-28 h-28 transition-all duration-500 ease-out z-10 ${
          downloadComplete ? 'rotate-[360deg] scale-110' : ''
        }`}>
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_4px_8px_rgba(139,21,56,0.4)] transition-transform duration-300 hover:scale-105 hover:rotate-[-5deg]"
            style={{
              filter: downloadComplete ? 'none' : 'grayscale(0.3)',
            }}
          >
            {/* Wax seal outer circle */}
            <circle cx="50" cy="50" r="48" fill="#8B1538" opacity="0.9"/>
            <circle cx="50" cy="50" r="45" fill="#A01D48"/>
            
            {/* Heart emboss */}
            <path
              d="M50 65 Q35 55 35 45 Q35 35 45 35 Q50 40 50 40 Q50 40 55 35 Q65 35 65 45 Q65 55 50 65"
              fill="#8B1538"
              stroke="#6B0F2A"
              strokeWidth="1"
            />
            
            {/* Wax drips */}
            <ellipse cx="30" cy="90" rx="8" ry="4" fill="#8B1538" opacity="0.6"/>
            <ellipse cx="70" cy="88" rx="6" ry="3" fill="#8B1538" opacity="0.6"/>
            <ellipse cx="50" cy="92" rx="7" ry="4" fill="#8B1538" opacity="0.6"/>
          </svg>

          {/* Checkmark when complete */}
          {downloadComplete && (
            <div className="absolute inset-0 flex items-center justify-center animate-[fadeIn_0.3s_ease-in]">
              <svg viewBox="0 0 52 52" className="w-16 h-16">
                <circle 
                  cx="26" 
                  cy="26" 
                  r="25" 
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="3"
                  strokeDasharray="166"
                  strokeDashoffset="166"
                  className="animate-[stroke_0.6s_cubic-bezier(0.65,0,0.45,1)_forwards]"
                />
                <path 
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="3"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  strokeDasharray="48"
                  strokeDashoffset="48"
                  className="animate-[stroke_0.3s_cubic-bezier(0.65,0,0.45,1)_0.3s_forwards]"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Stamp Buttons */}
        <div className="flex gap-6 z-10">
          {/* PNG Button */}
          <button
            onClick={() => handleDownload('png')}
            disabled={isDownloading}
            className="relative group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:translate-y-[-4px] hover:rotate-[-2deg] active:translate-y-0 active:rotate-0"
            aria-label="Download as PNG"
          >
            {/* Stamp Border with perforated edge */}
            <div 
              className="relative p-1 bg-gradient-to-br from-[#8B1538] to-[#A01D48] drop-shadow-[0_4px_6px_rgba(139,21,56,0.3)]"
              style={{
                clipPath: `polygon(
                  0% 0%, 5% 0%, 5% 3%, 10% 3%, 10% 0%, 15% 0%, 15% 3%, 20% 3%, 20% 0%,
                  25% 0%, 25% 3%, 30% 3%, 30% 0%, 35% 0%, 35% 3%, 40% 3%, 40% 0%,
                  45% 0%, 45% 3%, 50% 3%, 50% 0%, 55% 0%, 55% 3%, 60% 3%, 60% 0%,
                  65% 0%, 65% 3%, 70% 3%, 70% 0%, 75% 0%, 75% 3%, 80% 3%, 80% 0%,
                  85% 0%, 85% 3%, 90% 3%, 90% 0%, 95% 0%, 95% 3%, 100% 3%, 100% 0%,
                  100% 5%, 97% 5%, 97% 10%, 100% 10%, 100% 15%, 97% 15%, 97% 20%,
                  100% 20%, 100% 25%, 97% 25%, 97% 30%, 100% 30%, 100% 35%, 97% 35%,
                  97% 40%, 100% 40%, 100% 45%, 97% 45%, 97% 50%, 100% 50%, 100% 55%,
                  97% 55%, 97% 60%, 100% 60%, 100% 65%, 97% 65%, 97% 70%, 100% 70%,
                  100% 75%, 97% 75%, 97% 80%, 100% 80%, 100% 85%, 97% 85%, 97% 90%,
                  100% 90%, 100% 95%, 97% 95%, 97% 100%, 100% 100%, 95% 100%, 95% 97%,
                  90% 97%, 90% 100%, 85% 100%, 85% 97%, 80% 97%, 80% 100%, 75% 100%,
                  75% 97%, 70% 97%, 70% 100%, 65% 100%, 65% 97%, 60% 97%, 60% 100%,
                  55% 100%, 55% 97%, 50% 97%, 50% 100%, 45% 100%, 45% 97%, 40% 97%,
                  40% 100%, 35% 100%, 35% 97%, 30% 97%, 30% 100%, 25% 100%, 25% 97%,
                  20% 97%, 20% 100%, 15% 100%, 15% 97%, 10% 97%, 10% 100%, 5% 100%,
                  5% 97%, 0% 97%, 0% 100%, 0% 95%, 3% 95%, 3% 90%, 0% 90%, 0% 85%,
                  3% 85%, 3% 80%, 0% 80%, 0% 75%, 3% 75%, 3% 70%, 0% 70%, 0% 65%,
                  3% 65%, 3% 60%, 0% 60%, 0% 55%, 3% 55%, 3% 50%, 0% 50%, 0% 45%,
                  3% 45%, 3% 40%, 0% 40%, 0% 35%, 3% 35%, 3% 30%, 0% 30%, 0% 25%,
                  3% 25%, 3% 20%, 0% 20%, 0% 15%, 3% 15%, 3% 10%, 0% 10%, 0% 5%,
                  3% 5%, 3% 0%
                )`
              }}
            >
              <div className="flex flex-col items-center justify-center gap-2 w-24 h-24 bg-gradient-to-br from-[#FFF5F7] to-[#FFE8EC] text-[#8B1538]">
                <span className="text-lg font-bold tracking-[2px] font-mono">PNG</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 opacity-70">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
            </div>
          </button>

          {/* JPEG Button */}
          <button
            onClick={() => handleDownload('jpeg')}
            disabled={isDownloading}
            className="relative group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:translate-y-[-4px] hover:rotate-[-2deg] active:translate-y-0 active:rotate-0"
            aria-label="Download as JPEG"
          >
            {/* Stamp Border with perforated edge */}
            <div 
              className="relative p-1 bg-gradient-to-br from-[#8B1538] to-[#A01D48] drop-shadow-[0_4px_6px_rgba(139,21,56,0.3)]"
              style={{
                clipPath: `polygon(
                  0% 0%, 5% 0%, 5% 3%, 10% 3%, 10% 0%, 15% 0%, 15% 3%, 20% 3%, 20% 0%,
                  25% 0%, 25% 3%, 30% 3%, 30% 0%, 35% 0%, 35% 3%, 40% 3%, 40% 0%,
                  45% 0%, 45% 3%, 50% 3%, 50% 0%, 55% 0%, 55% 3%, 60% 3%, 60% 0%,
                  65% 0%, 65% 3%, 70% 3%, 70% 0%, 75% 0%, 75% 3%, 80% 3%, 80% 0%,
                  85% 0%, 85% 3%, 90% 3%, 90% 0%, 95% 0%, 95% 3%, 100% 3%, 100% 0%,
                  100% 5%, 97% 5%, 97% 10%, 100% 10%, 100% 15%, 97% 15%, 97% 20%,
                  100% 20%, 100% 25%, 97% 25%, 97% 30%, 100% 30%, 100% 35%, 97% 35%,
                  97% 40%, 100% 40%, 100% 45%, 97% 45%, 97% 50%, 100% 50%, 100% 55%,
                  97% 55%, 97% 60%, 100% 60%, 100% 65%, 97% 65%, 97% 70%, 100% 70%,
                  100% 75%, 97% 75%, 97% 80%, 100% 80%, 100% 85%, 97% 85%, 97% 90%,
                  100% 90%, 100% 95%, 97% 95%, 97% 100%, 100% 100%, 95% 100%, 95% 97%,
                  90% 97%, 90% 100%, 85% 100%, 85% 97%, 80% 97%, 80% 100%, 75% 100%,
                  75% 97%, 70% 97%, 70% 100%, 65% 100%, 65% 97%, 60% 97%, 60% 100%,
                  55% 100%, 55% 97%, 50% 97%, 50% 100%, 45% 100%, 45% 97%, 40% 97%,
                  40% 100%, 35% 100%, 35% 97%, 30% 97%, 30% 100%, 25% 100%, 25% 97%,
                  20% 97%, 20% 100%, 15% 100%, 15% 97%, 10% 97%, 10% 100%, 5% 100%,
                  5% 97%, 0% 97%, 0% 100%, 0% 95%, 3% 95%, 3% 90%, 0% 90%, 0% 85%,
                  3% 85%, 3% 80%, 0% 80%, 0% 75%, 3% 75%, 3% 70%, 0% 70%, 0% 65%,
                  3% 65%, 3% 60%, 0% 60%, 0% 55%, 3% 55%, 3% 50%, 0% 50%, 0% 45%,
                  3% 45%, 3% 40%, 0% 40%, 0% 35%, 3% 35%, 3% 30%, 0% 30%, 0% 25%,
                  3% 25%, 3% 20%, 0% 20%, 0% 15%, 3% 15%, 3% 10%, 0% 10%, 0% 5%,
                  3% 5%, 3% 0%
                )`
              }}
            >
              <div className="flex flex-col items-center justify-center gap-2 w-24 h-24 bg-gradient-to-br from-[#FFF5F7] to-[#FFE8EC] text-[#8B1538]">
                <span className="text-lg font-bold tracking-[2px] font-mono">JPEG</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 opacity-70">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Ribbon Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none">
          <svg viewBox="0 0 200 30" className="w-full h-full">
            <path d="M0,15 Q50,5 100,15 T200,15" stroke="#C4969B" strokeWidth="8" fill="none" opacity="0.6"/>
            <path d="M0,15 Q50,25 100,15 T200,15" stroke="#D4A6AB" strokeWidth="6" fill="none" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Loading/Success Message */}
      {(isDownloading || downloadComplete) && (
        <div className="min-h-8 text-center mt-4">
          {isDownloading && !downloadComplete && (
            <p className="text-[#8B1538] italic animate-[fadeInUp_0.4s_ease-out] font-serif">
              <span className="inline-block animate-pulse">❤</span> Sealing your love letter...
            </p>
          )}
          {downloadComplete && (
            <p className="text-[#2D7A2C] font-medium animate-[fadeInUp_0.4s_ease-out] font-serif">
              <span className="inline-block animate-[sparkle_0.6s_ease-in-out]">✨</span> Card sealed & delivered!
            </p>
          )}
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default CardDownloadButton;