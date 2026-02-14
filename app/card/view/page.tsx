"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CardPreview from "../../components/CardPreview";

interface Sticker {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function ViewCard() {
  const params = useSearchParams();
  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 1, x: 20, y: 20, emoji: "💖" },
    { id: 2, x: 200, y: 80, emoji: "💕" },
    { id: 3, x: 100, y: 200, emoji: "💘" },
  ]);

  const moveSticker = (id: number, x: number, y: number) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, x, y } : s))
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CardPreview
        recipient={params.get("to") || "Someone"}
        message={params.get("msg") || ""}
        theme={params.get("theme") || "romantic"}
        alignment={(params.get("align") as any) || "center"}
        font={params.get("font") || "serif"}
        stickers={stickers}
        moveSticker={moveSticker}
      />
    </div>
  );
}
