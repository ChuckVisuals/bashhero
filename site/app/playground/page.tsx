import BashTerminal from "@/components/Terminal";

export default function Playground() {

    const preConfig = {
        PreProccessCmds: ["mkdir test", "cd test", "touch hello.txt", "cd ..", "clear"],
        testCases: [],
        testCasesResults: [],
        restrictedCommands: ["cd", "shutdown", "reboot"]
    }

    return (
        <div className="">
            <div className="flex flex-row bg-slate-800 border rounded-lg round-lg p-4 m-4 justify-between">
                <div>
                    <h1 className="text-2xl text-white">Playground</h1>
                    <p className="text-slate-400">This is a playground for testing and playing with the terminal.</p>
                </div>
                <div className="">
                    Bash Hero
                    <BashTerminal preConfig={preConfig} />
                </div>
            </div>
            <div>
                <h1 className="text-2xl text-white">Test/Cases</h1>
            </div>

        </div>

    )
}
