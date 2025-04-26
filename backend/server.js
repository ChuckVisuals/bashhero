const WebSocket = require("ws");
const pty = require("node-pty");
const { spawn } = require("child_process");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WebSocket server is running on ws://localhost:8080");
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  const shell = pty.spawn(
    "docker",
    [
      "run",
      "-it",
      "--rm", // Automatically remove the container when it exits
      "chuckvisuals/linux", // Replace "ubuntu" with your desired Docker image
      "bash", // Start a bash shell
    ],
    {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: "/",
    }
  );

  // Handle output from the Docker container
  shell.on("data", (data) => {
    console.log(`Shell output: ${data}`);
    ws.send(data);
  });

  // Handle messages from the WebSocket client
  ws.on("message", (message) => {
    const messageStr = message.toString(); // Convert Buffer to string
    console.log(`Received message: ${messageStr}`);
    shell.write(messageStr); // Write directly to the pseudo-TTY
  });

  // Handle WebSocket close
  ws.on("close", () => {
    console.log("Client disconnected");
    shell.kill();
  });

  // Handle WebSocket errors
  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
    shell.kill();
  });
});
