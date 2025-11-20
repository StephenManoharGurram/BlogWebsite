// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "God Blessed Me",
  description: "A simple place to pause, reflect, and share blessings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b3d2e] text-white`}
      >

        {/* NAVIGATION BAR */}
        <header className="w-full fixed top-0 left-0 z-20 border-b border-white/10">
  <nav
    className="
      w-full 
      px-4 sm:px-6 lg:px-8 
      py-5 sm:py-6 
      flex items-center 
      justify-between 
      bg-black/20 backdrop-blur-md
    "
  >
    {/* LEFT: Logo */}
    <div>
      <Link
        href="/"
        className="text-sm sm:text-base tracking-[0.25em] uppercase whitespace-nowrap"
      >
        God Blessed Me
      </Link>
    </div>

    {/* RIGHT: Nav Items + Login */}
    <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm md:text-base ml-auto">
      <Link href="/stories" className="hover:opacity-70 transition">
        Stories
      </Link>

      <Link href="/about" className="hover:opacity-70 transition">
        About
      </Link>

      <Link href="/contact" className="hover:opacity-70 transition">
        Contact
      </Link>

      <Link
        href="/auth/login"
        className="
          border border-[#F1F3E0] 
          px-5 py-2 
          rounded-full 
          text-xs sm:text-sm md:text-base 
          hover:bg-[#F1F3E0] hover:text-[#0b3d2e] 
          transition 
          whitespace-nowrap
        "
      >
        Login
      </Link>
    </div>
  </nav>
        </header>





        {/* MAIN CONTENT PUSHED BELOW NAV */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
