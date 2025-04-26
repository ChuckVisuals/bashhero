const WebSocket = require("ws");
const pty = require("node-pty");
const { spawn } = require("child_process");

// Create a WebSocket server
const wss = new WebSocket.Server( { host: '0.0.0.0', port: 8080 }, () => {
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

  // Send a ping every 30 seconds so terminal doesn't timeout in PROD
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping(); // Send a protocol-level ping
      console.log("Ping sent to client");
    }
  }, 30000); // 30 seconds

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
  // Need to handle not to kill term if the user leaves the page
  // or closes the tab
  // This is a workaround to prevent the terminal from being killed
  ws.on("close", () => {
    console.log("Client disconnected");
    shell.kill();
  });

  // Handle WebSocket errors
  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
    clearInterval(interval);
    shell.kill();
  });
});
