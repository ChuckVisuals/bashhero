import Image from "next/image";
import Link from "next/link";
export default function Taskbar() {



    return (
        <div className="fixed top-0 right-0 z-20 w-screen h-16 border-b-2 border-neutral-600/40 bg-neutral-900 p-3.5">
            <div className="flex flex-row text-white">
                <Link href="/" className="flex flex-row text-2xl font-bold items-center ml-6 cursor-pointer">
                    <Image
                        src="/logo.svg"
                        alt="BashHero Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 mr-2 mb-0.5">
                    </Image>
                    BashHero
                </Link>
                <Link href="/problems" className="ml-15 flex flex-row items-center text-lg hover:text-neutral-300 cursor-pointer duration-300">
                    Problems
                </Link>
            </div>
        </div>
    );
}