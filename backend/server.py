import asyncio
import websockets
import subprocess

async def handle_terminal(websocket):
    # Start a new shell process
    process = subprocess.Popen(
        ["bash"],  # Replace "bash" with your desired shell
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1
    )

    async def read_from_process():
        # Read output from the shell and send it to the client
        while True:
            output = process.stdout.readline()
            if output:
                await websocket.send(output)
            await asyncio.sleep(0.1)

    async def write_to_process():
        try:
            print("write_to_process started")
            async for message in websocket:
                print(f"Received message: {message}")
                if message.strip():
                    process.stdin.write(message + '\n')
                    process.stdin.flush()
        except Exception as e:
            print(f"Error in write_to_process: {e}")

    # Run the read and write tasks concurrently
    await asyncio.gather(read_from_process(), write_to_process())

    # Clean up when the connection is closed
    process.terminate()

async def main():
    # Start the WebSocket server
    async with websockets.serve(handle_terminal, "localhost", 8080):
        print("WebSocket server is running on ws://localhost:8080")
        await asyncio.Future()  # Run forever

# Use asyncio.run to start the event loop
asyncio.run(main())