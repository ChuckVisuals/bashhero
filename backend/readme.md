# Steps to Run the Project Locally 

## 1. Install Node Packages
```bash
npm install
```

## 2. Build the Linux Image 
```bash
docker build -f Dockerfile.linux -t chuckvisuals/testing:latest .
```

## 3. Start the Server
```bash
node server.js
```

---

## Push Updated Docker Image (Linux)
If Docker for Linux is updated, run these commands to push the new image to Docker Hub:

### Build the Image
```bash
docker build -f Dockerfile.linux -t chuckvisuals/testing:latest .
```

### Push the Image
```bash
docker push chuckvisuals/testing:latest
```
---

## Push Updated Docker Image (Server)
If Backend Code is updated, run these commands to push the new image to Docker Hub:

### Build the Image
```bash
docker build -t chuckvisuals/server .
```

### Running the Image Locally
```bash
docker run -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock chuckvisuals/server
```

### Pushing the Image 
```bash
docker push chuckvisuals/server:latest
```