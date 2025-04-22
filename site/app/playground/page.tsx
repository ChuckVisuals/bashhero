"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect } from "react";
import "@xterm/xterm/css/xterm.css";


export default function Playground() {

    useEffect(() => {
        const term = new Terminal();
        const terminalElement = document.getElementById('terminal');
        if (terminalElement) {
            term.open(terminalElement);
            let currentLine = "";

            // Enable typing in the terminal
            term.onData((data) => {
                if (data === "\x7F") {
                    // Handle backspace
                    if (currentLine.length > 0) {
                        currentLine = currentLine.slice(0, -1); // Remove the last character
                        term.write("\b \b"); // Move cursor back, overwrite with space, and move back again
                    }
                } else if (data === "\r") {
                    // Handle Enter key
                    term.write("\r\n"); // Move to the next line
                    currentLine = ""; // Clear the current line
                    term.write('$ '); // Add a new prompt
                } else {
                    currentLine += data; // Add the input to the current line
                    term.write(data); // Echo the input
                }
            });
            term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
        } else {
            console.error("Terminal element not found");
        }
    }, []);

    return (
        <div className="flex flex-col bg-slate-800 border-2 item-center justify-center">
            <div>
                Bash Hero
            </div>
            <div id="terminal" className=""></div>
        </div>

    )
}
