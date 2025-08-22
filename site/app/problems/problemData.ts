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
        id: "demo",
        name: "",
        PreProccessCmds: [
            "mkdir test",
            "cd test",
            "touch hello.txt",
            "cd ..",
            "clear"
        ],
        testCases: [],
        testCasesResults: [],
        restrictedCommands: ["shutdown", "reboot"],
        description: ``,
        tags: ["bash", "grep", "find"],
        difficulty: Difficulty.Intermediate //Doesnt matter for landing page
    },
    {
        id: "welcome",
        name: "🧠 Hidden Message",
        PreProccessCmds: [
            "mkdir mission",
            "cd mission",
            "touch readme.txt",
            "mkdir alpha",
            "cd alpha",
            "touch dummy1.txt",
            "mkdir beta",
            "cd beta",
            "touch log.txt",
            "mkdir gamma",
            "cd gamma",
            "echo 'TOPSECRET' > hidden_message.txt",
            "cd ..",
            "cd ..",
            "cd ..",
            "cd ..",
            "clear"
        ],
        // User must input the final answer instead of running tests
        testCases: ["/workspace/alpha/beta/gamma/hidden_message.txt","/workspace/alpha/beta/gamma","/workspace/alpha/beta/gamma/"], // ✅ path to hidden file
        testCasesResults: [],
        restrictedCommands: ["shutdown", "reboot"],
        description: `
        ### 📝 Description:
        Somewhere in a nested directory structure, a \`.txt\` file contains the keyword \`TOPSECRET\`. Your mission is to locate that file.

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
        - Navigate into the \`mission/\` directory.
        - Find the file that contains the word \`TOPSECRET\`.
        - Submit the **path to that file** as your answer.

        ---
        ### 💡 Skills Practiced:
        - \`grep -r\`
        - \`find\`
        - Recursive search
        `,
        tags: ["bash", "grep", "find"],
        difficulty: Difficulty.Beginner
    },
    // {
    //     id: "file-cleanup",
    //     name: "🧹 File Cleanup",
    //     PreProccessCmds: [
    //         "rm -rf /workspace/cleanup",
    //         "mkdir cleanup",
    //         "cd cleanup",
    //         "touch file1.txt file2.log file3.tmp",
    //         "mkdir logs",
    //         "cd ..",
    //         "clear"
    //     ],
    //     testCases: [
    //         "if [ ! -f /workspace/cleanup/file3.tmp ]; then echo '✅ .tmp files are deleted'; else echo '❌ .tmp files are still present'; fi > /workspace/cleanup/test_output.txt",
    //         "if [ -f /workspace/cleanup/logs/file2.log ] &&  [ ! -f /workspace/cleanup/file2.log ]; then echo '✅ .log files are moved to logs/'; else echo '❌ .log files are not in logs/'; fi >> /workspace/cleanup/test_output.txt",
    //         "clear",
    //         "cat /workspace/cleanup/test_output.txt"
    //     ],
    //     testCasesResults: [
    //         "✅ .tmp files are deleted",
    //         "✅ .log files are moved to logs/"
    //     ],
    //     restrictedCommands: ["rm -rf /"],
    //     description: `
    //         ### 📝 Description:
    //         Your task is to clean up a directory by organizing files into appropriate folders.

    //         ---

    //         ### 📁 Pre-created Structure:
    //         \`\`\`
    //         /cleanup
    //         ├── file1.txt
    //         ├── file2.log
    //         ├── file3.tmp
    //         └── logs/
    //         \`\`\`

    //         ---

    //         ### 🎯 Your Task:
    //         1. Move all log files (\`.log\`) into the \`logs/\` folder.
    //         2. Delete all temporary files (\`.tmp\`).

    //         ---

    //         ### 💡 Skills Practiced:
    //         - \`mv\`
    //         - \`rm\`
    //         - File globbing

    //         ---

    //         ### ✅ Sample Solution:
    //         \`\`\`bash
    //         mv *.log logs/
    //         rm *.tmp
    //         \`\`\``,
    //     tags: ["bash", "file-management"],
    //     difficulty: Difficulty.Beginner
    // },
    {
    id: "largest-file",
    name: "📦 Find the Largest File",
    PreProccessCmds: [
        "mkdir data",
        "cd data",
        "echo 'hello' > small.txt",
        "head -c 5000 </dev/urandom > medium.txt",
        "head -c 15000 </dev/urandom > dataset.csv",
        "cd ..",
        "clear"
    ],
    testCases: ["dataset.csv"],
    testCasesResults: [],
    restrictedCommands: ["shutdown", "reboot"],
    description: `
    ### 📝 Description:
    Inside the \`data/\` directory are several files of different sizes.
    Your task is to determine which file is the **largest** by size.

    ---
    ### 🎯 Your Task:
    - Explore the \`data/\` directory.
    - Submit the name of the **largest file**.
    
    ---
    ### 💡 Skills Practiced:
    - \`ls -lh\`
    - \`du -ah\`
    - \`sort -n\`
    `,
    tags: ["bash", "files", "sorting"],
    difficulty: Difficulty.Advanced
    },
    {
    id: "unique-words",
    name: "🔠 Count Unique Words",
    PreProccessCmds: [
        "echo 'apple orange banana apple grape banana apple' > notes.txt",
        "clear"
    ],
    testCases: ["4"],
    testCasesResults: [],
    restrictedCommands: ["shutdown", "reboot"],
    description: `
    ### 📝 Description:
    You have a text file called \`notes.txt\`.
    Count how many **unique words** appear in it.

    ---
    ### 🎯 Your Task:
    - Find the number of unique words.
    - Submit just the **number**.
    
    ---
    ### 💡 Skills Practiced:
    - \`tr\`, \`sort\`, \`uniq\`, \`wc -l\`
    `,
    tags: ["bash", "text-processing", "uniq"],
    difficulty: Difficulty.Intermediate
    },
    {
    id: "most-active-user",
    name: "👤 Most Active User",
    PreProccessCmds: [
        "echo 'user=john\nuser=alice\nuser=john\nuser=john\nuser=alice' > access.log",
        "clear"
    ],
    testCases: ["john"],
    testCasesResults: [],
    restrictedCommands: ["shutdown", "reboot"],
    description: `
    ### 📝 Description:
    A log file \`access.log\` contains multiple lines with usernames.
    Your job is to find which user appears the **most times**.

    ---
    ### 🎯 Your Task:
    - Find the most frequent username.
    - Submit just the **username**.
    
    ---
    ### 💡 Skills Practiced:
    - \`grep\`
    - \`cut\`
    - \`sort | uniq -c | sort -nr | head -n 1\`
    `,
    tags: ["bash", "logs", "counting"],
    difficulty: Difficulty.Beginner
    },
    {
    id: "executable-count",
    name: "⚙️ Count Executable Files",
    PreProccessCmds: [
        "mkdir bin",
        "cd bin",
        "echo 'echo hello' > script1.sh && chmod +x script1.sh",
        "echo 'ls -l' > script2.sh && chmod +x script2.sh",
        "echo 'cat notes.txt' > script3.sh",
        "cd ..",
        "clear"
    ],
    testCases: ["2"],
    testCasesResults: [],
    restrictedCommands: ["shutdown", "reboot"],
    description: `
    ### 📝 Description:
    Inside the \`bin/\` folder are several files.
    Some of them are **executable**.

    ---
    ### 🎯 Your Task:
    - Count how many files in \`bin/\` are executable.
    - Submit only the **number**.
    
    ---
    ### 💡 Skills Practiced:
    - \`find -type f -executable | wc -l\`
    - Understanding permissions (\`chmod\`)
    `,
    tags: ["bash", "permissions", "find"],
    difficulty: Difficulty.Advanced
    }
];