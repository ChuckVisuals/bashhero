import BashTerminal from "@/components/Terminal";
import ReactMarkdown from "react-markdown";
import dedent from "dedent";

export default function Playground() {

    const preConfig = {
        PreProccessCmds: ["mkdir test", "cd test", "touch hello.txt", "cd ..", "clear", "mkdir alpha", "cd alpha", "mkdir beta", "cd beta", "mkdir gamma", "cd gamma", "touch hidden_message.txt", "cd ..", "cd ..", "cd ..", "clear"],
        testCases: [],
        testCasesResults: [],
        restrictedCommands: ["shutdown", "reboot"],
        description: dedent(`
           ## 🧠 BashHero Challenge: "Secret Agent: Hidden Message"

### 📝 Description:
You've been hired as a secret agent trainee. Somewhere in a nested directory structure, a \`.txt\` file contains a hidden keyword: \`TOPSECRET\`. Your mission is to find that file and reveal the message.

---

### 📁 Pre-created Structure:
\`\`\`
/mission
  ├── alpha/
  │    ├── dummy1.txt
  │    └── beta/
  │         ├── log.txt
  │         └── gamma/
  │              └── hidden_message.txt  ← contains the word "TOPSECRET"
  └── readme.txt
\`\`\`

---

### 🎯 Your Task:
1. Navigate into the \`mission/\` directory.
2. Use a command to search **recursively** for the file that contains the word \`TOPSECRET\`.
3. Print out the path to that file and display its contents.

---

### 💡 Skills Practiced:
- \`cd\`
- \`ls\`
- \`grep\`
- \`find\`
- Using wildcards and pipes

---

### ✅ Sample Solution:
\`\`\`bash
cd mission
grep -r "TOPSECRET" .
\`\`\`

Or to show just the file path:

\`\`\`bash
grep -rnl "TOPSECRET" .
\`\`\`

Then view the message:

\`\`\`bash
cat ./alpha/beta/gamma/hidden_message.txt
\`\`\`

            `),
        tags: [],
        difficulty: ""
    }

    return (
        <div className="h-screen flex flex-col gap-4 mt-4">
            <div className="flex flex-row gap-x-20 bg-neutral-900 border border-neutral-600 rounded-lg round-lg p-4 mx-4 justify-between h-2/3">
                <div className="w-1/2">
                    <h1 className="text-2xl text-white">Description</h1>
                    <div className="prose prose-stone prose max-w-5xl prose-invert p-8 mt-4 border border-neutral-600 rounded-lg bg-neutral-800 max-h-9/10 overflow-y-auto">
                        <ReactMarkdown>{preConfig.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                    <h1 className="text-2xl text-white">Bash Hero</h1>
                    <div className="border border-neutral-600 rounded-lg p-1">
                        <BashTerminal preConfig={preConfig} />
                    </div>

                </div>
            </div>
            <div className="flex flex-row gap-4 bg-neutral-900 border border-neutral-600 round-lg p-4 mx-4 justify-between h-1/3">
                <h1 className="text-2xl text-white">Test/Cases</h1>
            </div>
        </div>

    )
}
