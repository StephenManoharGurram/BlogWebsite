// app/creator/dashboard/page.tsx

export default function CreatorDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F1F3E0] text-[#778873]">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Creator Dashboard
          </h1>
          <p className="text-lg">
            From here you&apos;ll eventually control the homepage message, posts,
            and stories.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#D2DCB6] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Edit Home Message</h2>
            <p className="text-sm mb-4">
              Update the main message that visitors see when they first arrive.
            </p>
            <button className="text-xs rounded-full border border-[#778873] px-4 py-1 hover:bg-[#778873] hover:text-[#F1F3E0] transition">
              Open (Sprint 1)
            </button>
          </div>

          <div className="rounded-2xl border border-[#D2DCB6] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Create Story</h2>
            <p className="text-sm mb-4">
              Draft a new reflection or blessing to appear on the Stories page.
            </p>
            <button className="text-xs rounded-full border border-[#778873] px-4 py-1 hover:bg-[#778873] hover:text-[#F1F3E0] transition">
              Open (Sprint 1)
            </button>
          </div>

          <div className="rounded-2xl border border-[#D2DCB6] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Published Posts</h2>
            <p className="text-sm mb-4">
              Review what&apos;s already live and decide what stays or changes.
            </p>
            <button className="text-xs rounded-full border border-[#778873] px-4 py-1 hover:bg-[#778873] hover:text-[#F1F3E0] transition">
              Open (Sprint 1)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
