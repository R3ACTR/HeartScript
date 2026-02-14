"use client";

import Wheel from "./components/Wheel";

export default function SpinTheWheelPage() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Spin the Wheel ❤️
      </h1>

      <Wheel />

    </main>
  );
}
