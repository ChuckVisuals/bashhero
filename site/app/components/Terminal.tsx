"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect, useState } from "react";
import "@xterm/xterm/css/xterm.css";

export default function BashTerminal({ preConfig }: any) {

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            rows: 34,
            cols: 80,
        });

        const terminalElement = document.getElementById("terminal");
        if (terminalElement) {
            term.open(terminalElement);

            // Establish WebSocket connection
            // wss://bashheroserver.online
            // ws://localhost:8080
            const socket = new WebSocket("wss://bashheroserver.online");

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
                    }
                }
                socket.send(data);
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
        };
    }, []);

    return (<div id="terminal" className=""></div>)
}
