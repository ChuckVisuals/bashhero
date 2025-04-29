"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
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

const BashTerminal = forwardRef(({ preConfig, termSettings, terminalId }: { preConfig: PreConfig; termSettings: [number, number, boolean]; terminalId: string }, ref) => {
    const containerName = `bashherotest-${preConfig.id}`;
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: termSettings[2],
            rows: termSettings[0],
            cols: termSettings[1],
            theme: {
                background: "#262626"
            }
        });

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
                term.write(event.data);
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

    // Expose a method to run commands via ref
    useImperativeHandle(ref, () => ({
        runCommands: (commands: string[]) => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                commands.forEach((cmd) => {
                    if (cmd == "clear") {
                        socketRef.current?.send(`${cmd}\n`);
                    } else {
                        socketRef.current?.send(`${cmd}\n`);
                    }
                });
            } else {
                console.error("WebSocket is not open. Cannot send commands.");
            }
        }
    }));

    return (<div id={terminalId} className=""></div>);
});

export default BashTerminal;