"use client";
import { useSearchParams } from "next/navigation";
import CardPreview from "../../components/CardPreview";

export default function ViewCard() {
  const params = useSearchParams();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CardPreview
        recipient={params.get("to") || "Someone"}
        message={params.get("msg") || ""}
        theme={params.get("theme") || "romantic"}
        alignment={(params.get("align") as any) || "center"}
        font={params.get("font") || "serif"}
      />
    </div>
  );
}
