"use client";

export default function LoveLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-red-100">
      <div className="text-6xl text-red-500 animate-bounce">
        ❤️
      </div>

      <p className="mt-6 text-xl font-semibold text-gray-700 animate-pulse">
        Calculating your love destiny...
      </p>
    </div>
  );
}
