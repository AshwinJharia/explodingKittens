# Exploding Kittens

This project is a full-stack application with a Go backend and a React frontend. Below are the instructions to set up and run the application, along with the repository structure.

## Setup Instructions

### Prerequisites
- Go (version 1.19 or later)
- Node.js (version 16.x or later)
- Redis

### Step-by-Step Guide

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AshwinJharia/explodingKittens.git
   cd [repository-name]
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install Go modules specified in `go.mod`:
     ```bash
     go get github.com/gin-contrib/cors@v1.7.2
     go get github.com/gin-gonic/gin@v1.10.0
     go get github.com/go-redis/redis/v8@v8.11.5
     ```

3. **Redis Setup:**
   - Check if Redis is installed and running:
     ```bash
     redis-server --version
     redis-cli ping
     ```
   - If Redis is not installed:
     - **For Windows:** Download the latest MSI file from [Redis Releases](https://github.com/tporadowski/redis/releases), and during installation, make sure to tick the option to add Redis to the PATH and environment variables.
     - **For macOS:**
       ```bash
       brew install redis
       ```
       Start Redis:
       ```bash
       brew services start redis
       ```
     - **For Linux:**
       ```bash
       sudo apt update
       sudo apt install redis-server
       sudo systemctl enable redis
       sudo systemctl start redis
       ```

   - Verify Redis is running:
     ```bash
     redis-cli ping
     ```

4. **Redis Configuration in Backend:**
   - Navigate to `backend/services/redisService.go` and adjust the comments to use the appropriate Redis instance for local development.

5. **Start the Backend Server:**
   - Run the following commands in the `backend` directory:
     ```bash
     go mod tidy
     go build .
     go run main.go
     ```
   - The backend server should now be running on `http://localhost:8080`.

6. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

7. **Create a `.env` File:**
   - In the `frontend` directory, create a `.env` file and add the following line:
     ```env
     VITE_API_URL=http://localhost:8080
     ```
   - You may change the `VITE_API_URL` if your backend server is running on a different port.

8. **Start the Frontend Server:**
   ```bash
   npm run dev
   ```

9. **Access the Application:**
   - Open your browser and go to `http://localhost:5174` or `http://localhost:5173`.

## Repository Structure

```
main
├── backend
│   ├── handlers
│   │   └── userHandler.go
│   ├── models
│   │   └── userModel.go
│   ├── services
│   │   └── redisService.go
│   ├── go.mod
│   ├── go.sum
│   └── main.go
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── Components
│   │   │   ├── Card.jsx
│   │   │   ├── Deck.jsx
│   │   │   ├── Game.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Score.jsx
│   │   │   ├── Status.jsx
│   │   │   └── UserSt.jsx
│   │   ├── state
│   │   │   ├── gameSlice.js
│   │   │   └── userSlice.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── vite.config.js
```

## Notes
- Ensure all dependencies are installed and services are running before starting the backend and frontend servers.
- Adjust the `.env` file based on your backend's running port if different from `8080`.
```

This script can be saved directly as `README.md` in your project repository.