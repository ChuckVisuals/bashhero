const WebSocket = require("ws");
const { spawn } = require("child_process");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WebSocket server is running on ws://localhost:8080");
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  const shell = spawn("docker", [
    "run",
    "-i", // Interactive mode
    "--rm", // Automatically remove the container when it exits
    "ubuntu", // Replace "ubuntu" with your desired Docker image
    "bash", // Start a bash shell
  ]);

  // Handle output from the shell process
  shell.stdout.on("data", (data) => {
    console.log(`Shell output: ${data}`);
    ws.send(data.toString());
  });

  shell.stderr.on("data", (data) => {
    console.error(`Shell error: ${data}`);
    ws.send(data.toString());
  });

  shell.on("close", (code) => {
    console.log(`Shell process exited with code ${code}`);
    ws.close();
  });

  // Handle messages from the WebSocket client
  ws.on("message", (message) => {
    const messageStr = message.toString(); // Convert Buffer to string
    console.log(`Received message: ${messageStr}`);
    if (messageStr.trim()) {
      shell.stdin.write(messageStr + "\n");
    }
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
