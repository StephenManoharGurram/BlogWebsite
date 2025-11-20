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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

      {/* Royal Green Background */}
      <div className="absolute inset-0 bg-[#0b3d2e]"></div>

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
      ></div>


      {/* MESSAGE CARD USING YOUR PALETTE */}
      <div className="relative z-10 w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-xl border"
        style={{
          backgroundColor: "#F1F3E0",    // cream
          borderColor: "#778873"         // deep moss
        }}
      >
        <h1 className="fade-item text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" 
          style={{ color: "#080808ff" }} >
          God Blessed Me
        </h1>
        <p className="fade-item text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: "#080808ff" }}>
          If you found this website, I have to ask...
        </p>

        <p className="text-lg leading-relaxed"
          style={{ color: "#778873" }}   // deep moss
        >
          Did God bless you somehow this week? If so, go tell somebody about it,
          and then find a way to bless somebody else through your actions.
          Kindness. Goodness. Joy. It’s your turn.
        </p>
      </div>

    </div>
  );
}
