"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect } from "react";
import "@xterm/xterm/css/xterm.css";

export default function BashTerminal() {

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            rows: 24,
            cols: 80,
        });

        const terminalElement = document.getElementById("terminal");
        if (terminalElement) {
            term.open(terminalElement);

            // Establish WebSocket connection
            const socket = new WebSocket("ws://localhost:8080");

            // Handle incoming data from the WebSocket server
            socket.onmessage = (event) => {
                term.write(event.data);
            };

            // Handle terminal input and send it to the WebSocket server
            term.onData((data) => {
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