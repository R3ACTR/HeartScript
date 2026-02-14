"use client";

import ValentineCardGenerator from "../components/ValentineCardGenerator";

export default function CardPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] font-body flex flex-col">

      {/* HEADER */}
      <header className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <span className="font-display font-bold text-2xl text-[#800020]">
            HeartScript
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <ValentineCardGenerator />

      {/* FOOTER */}
      <footer className="w-full py-6 text-center text-gray-400 text-sm">
        © 2024 HeartScript. Made with ❤️ for love.
      </footer>

    </div>
  );
}
