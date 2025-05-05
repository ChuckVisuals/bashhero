import Link from 'next/link'
import Image from 'next/image'
import Terminal from '@/components/Terminal'
import { problems } from "@/problems/problemData";

export default function Home() {
  return (
    <main className="bg-neutral-900 text-white max-h-screen">

      {/* Taskbar */}
      <div className="w-full h-16 border-b-2 border-neutral-600/40 bg-neutral-900 p-3.5">
        <div className="flex flex-row text-white">
          <Link href="/" className="flex flex-row text-2xl font-bold items-center ml-6 cursor-pointer">
            <Image
              src="/logo.svg"
              alt="BashHero Logo"
              width={30}
              height={30}
              className="h-10 w-10 mr-2 mb-0.5">
            </Image>
            BashHero
          </Link>
          <Link href="/problems" className="ml-15 flex flex-row items-center text-lg hover:text-neutral-300 cursor-pointer duration-300">
            Problems
          </Link>
        </div>
      </div>




      {/* Hero Section */}
      <div className="flex flex-col items-center py-40">
        <div className="flex sm:flex-row flex-col items-center justify-center bg-neutral-900 px-6 py-1">
          <div className="flex flex-col items-center justify-center text-left px-6 ">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">BashHero</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
              Master the command line like a hero. Simplify your terminal workflow with smart suggestions, scripts, and real-time feedback.
            </p>
          </div>
          <Image
            src="/code.svg"
            alt="code"
            width={300}
            height={300}
          />

        </div>
        <Link href="/problems" className="flex px-8 py-3 h-15 w-60 border border-neutral-600/60 bg-neutral-800 hover:bg-neutral-700 rounded-4xl transition text-xl font-semibold items-center justify-center text-center duration-300 mt-8">
          <Image
            src="/start.svg"
            alt="start"
            width={30}
            height={30}
            className='invert mr-5'
          />
          Get Started
        </Link>
      </div>


      {/* Features Section */}
      <section id="features" className="bg-neutral-800 px-6 py-20">
        <div className="flex flex-col items-center">

          <h2 className="text-3xl font-semibold mb-12 text-center">Features</h2>

          <div className="flex flex-col gap-8 mb-12 justify-center items-center w-270">
            <div className="flex flex-row gap-8 text-left">
              <div className="p-6 rounded-xl border border-neutral-600/60">
                <div className="flex flex-row items-center">
                  <Image
                    src="/tracking.svg"
                    alt="tracking"
                    width={30}
                    height={30}
                    className='invert mr-2 mb-1'
                  />
                  <h3 className="text-lg font-bold mb-2">Tracking Progress</h3>
                </div>

                <p className="text-gray-300">Track the progress between you and your friends.</p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-600/60">
                <div className="flex flex-row items-center">
                  <Image
                    src="/click.svg"
                    alt="click"
                    width={30}
                    height={30}
                    className='invert mr-2 mb-1.5'
                  />
                  <h3 className="text-lg font-bold mb-2">One-Click Scripts</h3>
                </div>
                <p className="text-gray-300">Save and run bash tasks from a sleek web interface.</p>
              </div>
              <div className="p-6 rounded-xl border border-neutral-600/60">
                <div className="flex flex-row items-center">
                  <Image
                    src="/live.svg"
                    alt="live"
                    width={30}
                    height={30}
                    className='invert mr-2 mb-2'
                  />
                  <h3 className="text-lg font-bold mb-2">Live Feedback</h3>
                </div>
                <p className="text-gray-300">Real-time terminal output using WebSocket integration.</p>
              </div>
            </div>

            <div className="border border-neutral-600/60 rounded-lg p-2 overflow-hidden h-120 w-270">
              <Terminal preConfig={problems[0]} termSettings={[100, 100, true]} terminalId="terminal-bashing" />
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
