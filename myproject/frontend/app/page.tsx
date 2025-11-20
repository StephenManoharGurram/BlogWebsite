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
    <div className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* Royal Green Background */}
      <div className="absolute inset-0 bg-[#0b3d2e]"></div>

      {/* Interactive Gradient Layer */}
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

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-white flex flex-col gap-6">

        <h1 className="fade-item text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          God Blessed Me
        </h1>

        <p className="fade-item text-base sm:text-lg md:text-xl leading-relaxed">
          If you found this website, I have to ask...
        </p>

        <p className="fade-item text-xl sm:text-2xl md:text-3xl font-semibold leading-snug">
          Did God bless you somehow this week?
        </p>

        <p className="fade-item text-base sm:text-lg md:text-xl mt-4 leading-relaxed">
          If so, go tell somebody about it,<br />
          and then find a way to bless somebody else through your actions.
        </p>

        <p className="fade-item mt-6 text-lg sm:text-xl md:text-2xl font-semibold">
          Kindness. Goodness. Joy.
        </p>

        <p className="fade-item text-base sm:text-lg md:text-xl mb-10">
          It’s your turn.
        </p>

      </div>
    </div>
  );
}
