/*export default function HomePage() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold">
        Sprint-0 Homepage Loaded Successfully 🎉
      </h1>
    </div>
  );
}
*/// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top header with QR + Login */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="text-lg font-semibold">My Friend&apos;s Blog</div>

        <div className="flex items-center gap-4">
          {/* QR preview (for Sprint-0 this is just a static image) */}
          <div className="h-12 w-12 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src="/homepage-qr.png"
              alt="Homepage QR"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Login button */}
          <Link
            href="/auth/login"
            className="border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-900 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 gap-12">
        {/* First box: "Message" (top home page area) */}
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Message</h2>
          <p className="text-gray-600">
            This is the first message area on the home page. In Sprint-0 it&apos;s
            hard-coded, but in Sprint-1 this will show the latest message that
            your creator posts.
          </p>
        </section>

        {/* Scroll hint */}
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <span className="text-sm">Scroll</span>
          <div className="h-6 w-px bg-gray-300" />
          <span className="text-xs uppercase tracking-wide">Home Page</span>
        </div>

        {/* Second big box: "Main Message" */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Main Message</h2>
          <p className="text-gray-600 leading-relaxed">
            This is the big main message block that you drew at the bottom of
            your sketch. Later, your friend (the creator) will control this
            section from the creator dashboard and it will update without
            changing the URL or the QR code.
          </p>
        </section>
      </main>
    </div>
  );
}
