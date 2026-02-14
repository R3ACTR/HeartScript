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

  // Download handler will be implemented in next commit
  const handleDownload = async (format: 'png' | 'jpeg') => {
    console.log(`Download ${format} requested`);
    // Implementation coming next
  };

  return (
    <div className="download-container">
      <div className="love-letter-seal">
        {/* Wax seal will be added in next commit */}
        <div className="wax-seal-placeholder">
          <p>🕯️ Wax Seal Coming Soon</p>
        </div>

        {/* Stamp buttons placeholder */}
        <div className="stamp-buttons">
          <button onClick={() => handleDownload('png')} disabled={isDownloading}>
            PNG
          </button>
          <button onClick={() => handleDownload('jpeg')} disabled={isDownloading}>
            JPEG
          </button>
        </div>
      </div>

      {/* Status messages */}
      {isDownloading && <p>⏳ Downloading...</p>}
      {downloadComplete && <p>✅ Download complete!</p>}

      <style jsx>{`
        .download-container {
          padding: 2rem;
          text-align: center;
        }
        button {
          margin: 0 0.5rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CardDownloadButton;