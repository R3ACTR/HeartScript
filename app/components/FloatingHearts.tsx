"use client";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
      {hearts.map((_, i) => (
        <span
          key={i}
          className="absolute text-pink-300 animate-float-heart"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${12 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${14 + Math.random() * 18}px`,
            opacity: 0.12,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
