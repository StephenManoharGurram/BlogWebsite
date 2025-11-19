export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-20 px-6">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Our Blog
      </h1>

      <p className="max-w-2xl text-center text-lg mb-10">
        This is the base version of the website. A more dynamic creator-driven 
        homepage will be added in Sprint-1. For now, enjoy our preview!
      </p>

      <img
        src="/placeholder.jpg"
        alt="Coming Soon"
        className="w-full max-w-xl rounded shadow mb-10"
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded text-lg"
        onClick={() => alert("Creator system coming soon!")}
      >
        Creator Dashboard (Coming Soon)
      </button>

      <footer className="mt-20 text-gray-600">
        Sprint-0 • Base Version • © 2025
      </footer>
    </div>
  );
}
