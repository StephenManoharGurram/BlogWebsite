"use client";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg opacity-90">🚀 Feature Coming Soon</p>
        <p className="text-sm opacity-60 mt-2">
          This feature will be available in a future sprint.
        </p>
      </div>
    </div>
  );
}
