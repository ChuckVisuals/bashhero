FROM node:23.11.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Need Docker CLI to run docker containers from server.js
RUN apt-get update && apt-get install -y docker.io

# Exposes 8080 for web socket
EXPOSE 8080
CMD ["node", "server.js"]
