"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect, useState, useImperativeHandle, useRef, forwardRef } from "react";
import { Difficulty } from "@/problems/problemData";
import "@xterm/xterm/css/xterm.css";

export interface PreConfig {
    id: string; // Unique identifier for each problem
    PreProccessCmds: string[];
    testCases: string[];
    testCasesResults: string[];
    restrictedCommands: string[];
    description: string;
    tags: string[];
    difficulty: Difficulty;
}

const BashTerminal = forwardRef(({ preConfig, termSettings, terminalId, onOutput, uniqueKey }:
    { preConfig: PreConfig; termSettings: [number, number, boolean]; terminalId: string; onOutput?: (output: boolean) => void; uniqueKey: string }, ref) => {
    //const containerName = `bashherotest-${preConfig.id}`;
    const socketRef = useRef<WebSocket | null>(null);




    const containerName = `bashherotest-${preConfig.id}-${uniqueKey}`;
    console.log("Container name:", containerName);

    const [termInstance, setTermInstance] = useState<Terminal>(new Terminal({})); // State to store the terminal instance


    useEffect(() => {
        const term = new Terminal({
            cursorBlink: termSettings[2],
            rows: termSettings[0],
            cols: termSettings[1],
            theme: {
                background: "#262626"
            }
        });
        setTermInstance(term);

        const terminalElement = document.getElementById(terminalId);
        if (terminalElement) {
            term.open(terminalElement);

            // Establish WebSocket connection
            // wss://bashheroserver.online
            // ws://localhost:8080
            const socket = new WebSocket(`wss://bashheroserver.online?containerName=${encodeURIComponent(containerName)}`);
            socketRef.current = socket;

            // Handle incoming data from the WebSocket server
            socket.onmessage = (event) => {
                const data = event.data;
                term.write(data);
            };

            // Handle terminal input and send it to the WebSocket server
            term.onData((data) => {
                const buffer = term.buffer.active;
                const lastLine = buffer.getLine(buffer.cursorY)?.translateToString() || ""; // Get the most recent line
                if (preConfig?.restrictedCommands) {
                    const badCommandFound = preConfig.restrictedCommands.some((cmd: string) => lastLine.includes(cmd));
                    if (badCommandFound) {
                        term.write("\r\nCommand not allowed.");
                        console.log("Command not allowed:", lastLine);
                    }
                }

                // Only allows input in the main terminal
                if (terminalId == "terminal-bashing") {
                    socket.send(data);
                }
                else {
                    return;
                }
            });

            // Handle WebSocket errors
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                term.write("\r\nWebSocket error occurred.\r\n");
            };

            // Handle WebSocket close
            socket.onclose = () => {
                term.write("\r\nConnection to server closed.\r\n");
            };

            // Initial message in the terminal
            term.write("Connecting to server...\r\n");

            // Handle WebSocket open (connection established)
            socket.onopen = () => {
                // Sends pre-configured commands to the terminal
                if (preConfig?.PreProccessCmds) {
                    preConfig.PreProccessCmds.forEach((cmd: any) => {
                        if (cmd == "clear") {
                            socket.send(`${cmd}\n`);
                        } else {
                            socket.send(`${cmd}\r\n`);
                        }
                        console.log(`Sent command: ${cmd}`);
                    });
                } else {
                    console.error("PreProccessCmds is undefined or empty.");
                }
            };
        } else {
            console.error("Terminal element not found");
        }
        // Cleanup on component unmount
        return () => {
            term.dispose();
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);



    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        runCommands, // Expose the runCommands function
        checkTest: () => {
            return CheckTest(); // Expose the CheckTest function
        },
    }));

    // Function to run the test cases
    // This function takes an array of commands and sends them to the terminal
    // It outputs the test results to the terminal
    const runCommands = (commands: string[]) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            commands.forEach((cmd) => {
                socketRef.current?.send(`${cmd}\n`);
            });
        } else {
            console.error("WebSocket is not open. Cannot send commands.");
        }
    };

    // Function to check test results
    // This function checks the output of the terminal against expected results
    // and calls the onOutput callback with true or false based on the results
    // It also returns the output as a string
    function CheckTest() {
        if (onOutput) {
            const allText = [];

            for (let i = 0; i < termInstance.buffer.active.length; i++) {
                const line = termInstance.buffer.active.getLine(i);
                if (line) {
                    allText.push(line.translateToString().trim());
                }
            }

            const numOfTestCases = preConfig.testCasesResults.length;
            var numOfPassedTestCases = 0;
            // Check if the output contains the expected results
            for (let i = 0; i < numOfTestCases; i++) {
                if (allText.includes(preConfig.testCasesResults[i])) {
                    numOfPassedTestCases++;
                }
                console.log("Expected:", preConfig.testCasesResults[i], "Found:", allText.includes(preConfig.testCasesResults[i]));
            }
            if (numOfPassedTestCases == numOfTestCases) {
                onOutput(true);
            }
            else {
                console.log("Num of test cases passed:", numOfPassedTestCases);
                onOutput(false);
            }
            return allText.join('\n');
        }
    }

    return (<div id={terminalId} className="no-xterm-scrollbar"></div>);
});

export default BashTerminal;
