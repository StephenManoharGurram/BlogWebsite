// app/page.tsx

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-center">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/homepage.jpg')",
        }}
      ></div>

      {/* Adjusted dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-white flex flex-col gap-6">

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          God Blessed Me
        </h1>

        <p className="text-lg md:text-xl">
          If you found this website, I have to ask...
        </p>

        <p className="text-2xl md:text-3xl font-semibold">
          Did God bless you somehow this week?
        </p>

        <p className="text-lg md:text-xl mt-4 leading-relaxed">
          If so, go tell somebody about it,<br />
          and then find a way to bless somebody else through your actions.
        </p>

        <p className="mt-6 text-xl md:text-2xl font-semibold">
          Kindness. Goodness. Joy.
        </p>

        <p className="text-lg md:text-xl">
          It’s your turn.
        </p>

      </div>
    </div>
  );
}
