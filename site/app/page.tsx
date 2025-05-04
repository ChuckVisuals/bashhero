import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-neutral-900 text-white max-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-46">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">BashHero</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Master the command line like a hero. Simplify your terminal workflow with smart suggestions, scripts, and real-time feedback.
        </p>
        <Link href="/problems" className="px-8 py-3 bg-neutral-600 hover:bg-neutral-700 rounded-xl transition">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-neutral-800 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-neutral-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Tracking Progress</h3>
              <p className="text-gray-300">Track the progress between you and your friends.</p>
            </div>
            <div className="bg-neutral-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">One-Click Scripts</h3>
              <p className="text-gray-300">Save and run bash tasks from a sleek web interface.</p>
            </div>
            <div className="bg-neutral-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Live Feedback</h3>
              <p className="text-gray-300">Real-time terminal output using WebSocket integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-2 border-t border-gray-700 bg-neutral-900 h-10">
        <p className="text-gray-500">© {new Date().getFullYear()} BashHero. All rights reserved.</p>
      </footer>
    </main>
  );
}
