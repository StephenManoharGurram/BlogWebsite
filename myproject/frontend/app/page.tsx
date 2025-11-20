"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (top) → 1 (end of first screen)

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

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(
        Math.max(window.scrollY / window.innerHeight, 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">

      {/* === FIRST SECTION (16:9 video hero) === */}
      <section className="relative w-full h-[100vh] overflow-hidden">

        {/* VIDEO LAYER with fade + parallax zoom */}
        <div
          className="absolute inset-0 flex items-center justify-center z-0"
          style={{
            opacity: 1 - scrollProgress * 0.85, // fades out as you scroll
            transform: `scale(${1 + scrollProgress * 0.08})`, // slight zoom
            transition: "opacity 0.1s linear, transform 0.1s linear",
          }}
        >
          {/* 16:9 container */}
          <div
            className="relative w-full"
            style={{ paddingTop: "56.25%" }} // 16:9 = 9/16 = 0.5625
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/home-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Soft dark overlay over video */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Spotlight overlay on entire first section */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-200 z-10"
          style={{
            background: `radial-gradient(
              circle at ${pos.x}% ${pos.y}%,
              rgba(255, 255, 255, 0.20),
              transparent 60%
            )`,
          }}
        />

        {/* Gradient fade into green for section 2 */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0b3d2e] z-20" />

        {/* HERO TEXT (A) */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white drop-shadow-lg">
            God Blessed Me
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-xl">
            If you found this website, I have to ask… Did God bless you somehow
            this week?
          </p>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
            If so, go tell somebody about it, and then find a way to bless
            somebody else through your actions. Kindness. Goodness. Joy. It’s
            your turn.
          </p>
        </div>

        {/* SCROLL INDICATOR (C) */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center">
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">
            Scroll
          </span>
          <span className="mt-2 text-2xl text-white/80 animate-bounce">⌄</span>
        </div>
      </section>

      {/* === SECOND SECTION === */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center"
        style={{ backgroundColor: "#0b3d2e" }}
      >
        <h1 className="text-white text-4xl opacity-80">Second Section</h1>

        {/* Spotlight still working here */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-200"
          style={{
            background: `radial-gradient(
              circle at ${pos.x}% ${pos.y}%,
              rgba(255, 255, 255, 0.20),
              transparent 60%
            )`,
          }}
        />
      </section>

      {/* === THIRD SECTION === */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center"
        style={{ backgroundColor: "#0b3d2e" }}
      >
        <h1 className="text-white text-4xl opacity-80">Third Section</h1>

        {/* Spotlight here too */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-200"
          style={{
            background: `radial-gradient(
              circle at ${pos.x}% ${pos.y}%,
              rgba(255, 255, 255, 0.20),
              transparent 60%
            )`,
          }}
        />
      </section>
    </div>
  );
}
