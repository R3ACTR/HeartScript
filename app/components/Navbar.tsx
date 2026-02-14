"use client";

import { Heart, Home, Code2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();



  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pink-300/5 backdrop-blur-xl border-b border-pink-100/60 shadow-[0_4px_20px_rgba(255,120,170,0.15)]
">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 group"
          >
            <img
              src="/heart.webp"
              alt="Heart"
              className="w-11 h-11 drop-shadow-md group-hover:scale-110 transition-transform duration-300 animate-heartbeat"
            />

            <span className="font-display text-xl font-bold text-gray-900">
              HeartScript
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out ${
                isActive("/")
                  ? "bg-pink-300/10 text-[#F875AA] "
                  : "text-[#F075AE] hover:bg-[#FFCDC9] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(255,105,135,0.22)]"
              }`}


            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>


          </div>
        </div>
      </div>
    </nav>
  );
}
