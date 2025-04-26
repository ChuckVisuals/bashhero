import BashTerminal from "@/components/Terminal";
import ReactMarkdown from "react-markdown";
import dedent from "dedent";

export default function Playground() {

    const preConfig = {
        PreProccessCmds: ["mkdir test", "cd test", "touch hello.txt", "cd ..", "clear"],
        testCases: [],
        testCasesResults: [],
        restrictedCommands: ["cd", "shutdown", "reboot"],
        description: dedent(`
            # Hello World
            This is some **bold** text, a [link](https://example.com), and some \`inline code\`.
            `),
        tags: [],
        difficulty: ""
    }

    return (
        <div className="h-screen flex flex-col gap-4">
            <div className="flex flex-row bg-slate-800 border rounded-lg round-lg p-4 mx-4 justify-between h-2/3">
                <div>
                    <h1 className="text-2xl text-white">Playground</h1>
                    <p className="text-slate-400">This is a playground for testing and playing with the terminal.</p>
                    <div className="prose prose-stone prose-invert p-2 mt-4 border rounded-lg bg-slate-950">
                        <ReactMarkdown>{preConfig.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="w-1/2">
                    <h1 className="text-2xl text-white">Bash Hero</h1>
                    <BashTerminal preConfig={preConfig} />
                </div>
            </div>
            <div className="flex flex-row bg-slate-800 border rounded-lg round-lg p-4 mx-4 justify-between h-1/3">
                <h1 className="text-2xl text-white">Test/Cases</h1>
            </div>
        </div>

    )
}

// import ReactMarkdown from 'react-markdown';

// const markdown = `
// # Hello World

// This is some **bold** text, a [link](https://example.com), and some \`inline code\`.
// `;

// export default function MarkdownRenderer() {
//   return (
//     <div className="prose max-w-none">
//       <ReactMarkdown>{markdown}</ReactMarkdown>
//     </div>
//   );
// }
