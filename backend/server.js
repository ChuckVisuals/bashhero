const WebSocket = require("ws");
const pty = require("node-pty");
const { execSync } = require("child_process");
const { spawn } = require("child_process");
const url = require("url");

// Create a WebSocket server
const wss = new WebSocket.Server( { host: '0.0.0.0', port: 8080 }, () => {
  console.log("WebSocket server is running on ws://localhost:8080");
});

wss.on("connection", (ws, req) => {
  console.log("Client connected");

  // Extract the container name from the WebSocket URL
  const query = url.parse(req.url, true).query;
  const rawName = query.containerName || "default_container"; // Default if not provided
  const containerName = rawName.replace(/[^a-zA-Z0-9-_]/g, '');
  console.log(`Using container name: ${containerName}`);

  let shell;

  // Check if the container already exists (running or stopped)
try {
  const existingContainer = execSync(`docker ps -aq -f name=${containerName}`).toString().trim();

  if (existingContainer) {
    console.log(`Reconnecting to existing container: ${containerName}`);
    // Check if the container is stopped
    const isRunning = execSync(`docker inspect -f '{{.State.Running}}' ${containerName}`).toString().trim();

    if (isRunning === "false") {
      console.log(`Starting stopped container: ${containerName}`);
      execSync(`docker start ${containerName}`);
    }

    // Attach to the existing container
    shell = pty.spawn("docker", ["exec", "-it", containerName, "bash"], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: "/",
    });
  } else {
    console.log(`Starting a new container: ${containerName}`);
    // Start a new container if it doesn't exist
    execSync(`docker run -it -d --name ${containerName} chuckvisuals/linux bash`);
    shell = pty.spawn("docker", ["exec", "-it", containerName, "bash"], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: "/",
    });

    // Track the container creation time
    containerCreationTimes.set(containerName, Date.now());
  }
} catch (error) {
  console.error("Error managing container:", error.message);
}

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













///////////////////////////////////// Safely Checks ///////////////////////////////////////////////
// Map to track container creation times
const containerCreationTimes = new Map();

// Function to check and kill expired containers
function checkAndKillExpiredContainers() {
  const now = Date.now();
  for (const [containerName, creationTime] of containerCreationTimes.entries()) {
    const elapsedTime = now - creationTime;
    if (elapsedTime > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
      console.log(`Killing container ${containerName} (exceeded 24 hours)`);
      try {
        execSync(`docker rm -f ${containerName}`);
        containerCreationTimes.delete(containerName); // Remove from the map
      } catch (error) {
        console.error(`Failed to kill container ${containerName}:`, error.message);
      }
    }
  }
}

// Periodically check for expired containers every hour
setInterval(checkAndKillExpiredContainers, 60 * 60 * 1000); // 1 hour in milliseconds
