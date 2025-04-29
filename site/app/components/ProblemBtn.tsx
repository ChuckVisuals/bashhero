import { Difficulty } from "@/problems/problemData";
import ReactMarkdown from "react-markdown";
import dedent from "dedent";
import Link from "next/link";

export default function ProblemBtn({ id, title, description, level }: { id: string, title: string, description: string, level: Difficulty }) {
    const borderColor = {
        [Difficulty.Beginner]: "border-green-500 hover:border-green-400 inset-shadow-sm inset-shadow-indigo-500/50 shadow-lg shadow-green-200/10",
        [Difficulty.Intermediate]: "border-orange-500 hover:border-orange-400 inset-shadow-sm inset-shadow-indigo-500/20 shadow-lg shadow-orange-200/10",
        [Difficulty.Advanced]: "border-red-500 hover:border-red-400 inset-shadow-sm inset-shadow-indigo-500/20 shadow-lg shadow-red-200/10",
    };

    return (
        <Link href={`/problems/${id}`}>
            <div className={`group relative border rounded-4xl h-64 w-86 bg-neutral-900 p-6 hover:h-80 hover:w-108 hover:bg-neutral-800 hover:cursor-pointer duration-400 overflow-hidden ${borderColor[level]}`}>
                <h2 className="text-xl font-bold text-white truncate">{title}</h2>
                <div className="prose prose-stone prose max-w-5xl prose-invert p-8 mt-4 border border-neutral-600 rounded-lg bg-neutral-800 max-h-9/10 overflow-hidden opacity-10 group-hover:opacity-100 duration-300">
                    <ReactMarkdown>{dedent(description)}</ReactMarkdown>
                </div>

                {/* Level Coded colors */}
                {level == Difficulty.Beginner && <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-green-900 blur-2xl opacity-40 group-hover:h-64 group-hover:w-64 group-hover:-top-20 group-hover:-right-20 duration-800"></div>}
                {level == Difficulty.Intermediate && <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-900 blur-2xl opacity-40 group-hover:h-64 group-hover:w-64 group-hover:-top-20 group-hover:-right-20 duration-800"></div>}
                {level == Difficulty.Advanced && <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-red-900 blur-2xl opacity-40 group-hover:h-64 group-hover:w-64 group-hover:-top-20 group-hover:-right-20 duration-800"></div>}

            </div>
        </Link>
    );
}