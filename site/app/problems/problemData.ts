export enum Difficulty {
    Beginner,
    Intermediate,
    Advanced,
}

export interface PreConfig {
    id: string; // Unique identifier for each problem
    name: string; // Name of the problem
    PreProccessCmds: string[];
    testCases: string[];
    testCasesResults: string[];
    restrictedCommands: string[];
    description: string;
    tags: string[];
    difficulty: Difficulty; // Use the Difficulty enum here
}

export const problems: PreConfig[] = [
    {
        id: "welcome",
        name: "🧠 BashHero Challenge: Secret Agent: Hidden Message",
        PreProccessCmds: [
            "mkdir test",
            "cd test",
            "touch hello.txt",
            "cd ..",
            "clear",
            "mkdir alpha",
            "cd alpha",
            "touch dummy1.txt",
            "mkdir beta",
            "cd beta",
            "touch log.txt",
            "mkdir gamma",
            "cd gamma",
            "touch hidden_message.txt",
            "cd ..",
            "cd ..",
            "cd ..",
            "clear"
        ],
        testCases: [],
        testCasesResults: [],
        restrictedCommands: ["shutdown", "reboot"],
        description: `
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
            \`\`\``,
        tags: ["bash", "grep", "find"],
        difficulty: Difficulty.Intermediate
    },
    {
        id: "file-cleanup",
        name: "🧹 BashHero Challenge: File Cleanup",
        PreProccessCmds: [
            "mkdir cleanup",
            "cd cleanup",
            "touch file1.txt file2.log file3.tmp",
            "mkdir logs",
            "clear"
        ],
        testCases: [
            "if [ ! -f /workspace/cleanup/file3.tmp ]; then echo '✅ .tmp files are deleted'; else echo '❌ .tmp files are still present'; fi > /workspace/cleanup/test_output.txt",
            "if [ -f /workspace/cleanup/logs/file2.log ]; then echo '✅ .log files are moved to logs/'; else echo '❌ .log files are not in logs/'; fi >> /workspace/cleanup/test_output.txt",
            "clear",
            "cat /workspace/cleanup/test_output.txt"
        ],
        testCasesResults: [
            "✅ .tmp files are deleted",
            "✅ .log files are moved to logs/"
        ],
        restrictedCommands: ["rm -rf /"],
        description: `
            ### 📝 Description:
            Your task is to clean up a directory by organizing files into appropriate folders.

            ---

            ### 📁 Pre-created Structure:
            \`\`\`
            /cleanup
            ├── file1.txt
            ├── file2.log
            ├── file3.tmp
            └── logs/
            \`\`\`

            ---

            ### 🎯 Your Task:
            1. Move all log files (\`.log\`) into the \`logs/\` folder.
            2. Delete all temporary files (\`.tmp\`).

            ---

            ### 💡 Skills Practiced:
            - \`mv\`
            - \`rm\`
            - File globbing

            ---

            ### ✅ Sample Solution:
            \`\`\`bash
            mv *.log logs/
            rm *.tmp
            \`\`\``,
        tags: ["bash", "file-management"],
        difficulty: Difficulty.Beginner
    }
    
];