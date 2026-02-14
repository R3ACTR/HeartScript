"use client";

import { DrakeCalculator } from "@/app/components/drake-calculator";
import FloatingHearts from "@/app/components/FloatingHearts";

export default function DrakeEquationPage() {
  return (
    <main className="premium-romantic-bg premium-vignette relative min-h-screen py-10">
      
      {/* 💗 Floating Background Hearts */}
      <FloatingHearts />

      <DrakeCalculator />

    </main>
  );
}
