"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      setPos({
        x: (t.clientX / window.innerWidth) * 100,
        y: (t.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[300vh] flex flex-col items-center justify-start overflow-hidden">

      {/* Royal Green Background */}
      <div className="absolute inset-0 bg-[#0b3d2e]" />

      {/* Interactive Spotlight */}
      <div
        className="absolute inset-0 transition-all duration-200 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${pos.x}% ${pos.y}%,
            rgba(255, 255, 255, 0.15),
            transparent 60%
          )`,
        }}
      />

      {/* SPACING BEFORE MESSAGE CARD */}
      <div className="h-[25vh]" />

      {/* WIDE MESSAGE CARD (80% WIDTH) */}
      <div
        className="
          relative z-10 
          w-[85%] sm:w-[80%] 
          p-10 sm:p-14 
          rounded-3xl shadow-2xl 
          border 
          mx-auto
        "
        style={{
          backgroundColor: "#ECF5E8",   // harmonious green-cream
          borderColor: "#778873",       // deep moss
        }}
      >
      </div>

      {/* EXTRA SPACE BELOW - enables a full 3-screen scroll */}
      <div className="h-[200vh]" />

    </div>
  );
}
