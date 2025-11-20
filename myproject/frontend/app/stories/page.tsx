// app/stories/page.tsx

const mockStories = [
  {
    id: 1,
    title: "A Small Answered Prayer",
    tag: "Reflection",
    snippet:
      "It wasn&apos;t dramatic. It wasn&apos;t loud. But it was exactly what I needed that day.",
  },
  {
    id: 2,
    title: "Kindness in the Grocery Line",
    tag: "Everyday Blessing",
    snippet:
      "Sometimes, God works through a stranger who simply decides not to look away.",
  },
  {
    id: 3,
    title: "When Plans Don&apos;t Work Out",
    tag: "Perspective",
    snippet:
      "Closed doors hurt, but looking back, I can see the mercy in the redirection.",
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F1F3E0] text-[#778873]">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Stories &amp; Reflections
          </h1>
          <p className="text-lg">
            Quiet stories of blessing, perspective, and small moments that
            mattered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {mockStories.map((story) => (
            <article
              key={story.id}
              className="flex flex-col justify-between rounded-2xl border border-[#D2DCB6] bg-white shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-[#A1BC98]">
                  {story.tag}
                </p>
                <h2 className="text-lg font-semibold">{story.title}</h2>
                <p className="text-sm leading-relaxed">{story.snippet}</p>
              </div>
              <p className="mt-4 text-xs text-[#A1BC98]">
                More coming in Sprint&nbsp;1…
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
