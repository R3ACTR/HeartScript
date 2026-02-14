# CardDownloadButton Component

## Overview

A vintage "love letter seal" themed download button for Valentine cards.

## Usage

\`\`\`tsx
import { CardDownloadButton } from './components/CardDownloadButton';

// Wrap your card with an ID
<div id="my-card">
  {/* Your card content */}
</div>

// Add the download button
<CardDownloadButton 
  cardElementId="my-card"
  cardTitle="valentine-card"
/>
\`\`\`

## Props

- `cardElementId` (string, required): ID of the HTML element to download
- `cardTitle` (string, optional): Filename prefix for downloaded file

## Features

- ❤️ Vintage wax seal animation
- 📮 Postal stamp styled buttons
- 📄 Paper texture overlay
- 🎀 Ribbon decorations
- PNG and JPEG format support
- High quality output (3x scale)
- Fully responsive
- Accessible (ARIA labels, keyboard nav)

## Design

This component intentionally avoids typical AI-generated design patterns by using:
- Warm romantic colors (reds, pinks, creams)
- Physical world metaphors (wax seal, postal stamps)
- Organic shapes and textures
- Emotional micro-copy
- Serif typography

## Dependencies

- html2canvas: HTML to image conversion
- React 18+
- Next.js 14+ (uses 'use client' directive)