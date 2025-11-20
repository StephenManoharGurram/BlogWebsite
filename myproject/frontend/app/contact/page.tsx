// app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F1F3E0] text-[#778873] flex items-center">
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Contact
        </h1>
        <p className="text-lg leading-relaxed">
          This isn&apos;t a support center. It&apos;s just a small inbox where you can
          share something on your heart, a blessing you experienced, or a word
          of encouragement.
        </p>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-[#D2DCB6] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A1BC98]"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Your message</label>
            <textarea
              rows={5}
              className="w-full rounded-xl border border-[#D2DCB6] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A1BC98]"
              placeholder="Share a blessing, reflection, or note…"
            />
          </div>
          <button
            type="button"
            className="rounded-full bg-[#778873] text-[#F1F3E0] px-6 py-2 text-sm font-medium hover:bg-[#556152] transition"
          >
            Send (coming soon)
          </button>
        </form>
      </section>
    </div>
  );
}
