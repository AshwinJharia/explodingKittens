# 🎮 Exploding Kittens - Single Player Game

A modern single-player implementation of the popular Exploding Kittens card game with user authentication and leaderboards.

## 🚀 Features

- **Single Player Game** - Draw cards and avoid exploding kittens
- **User Authentication** - JWT-based registration and login
- **Score Tracking** - Personal scores and global leaderboard
- **Responsive Design** - Works on all screen sizes
- **Real-time Feedback** - Toast notifications for all actions

## 🏗 Tech Stack

**Backend:** Go + Gin + Redis (Database)  
**Frontend:** React + Vite + Redux + Framer Motion  
**Database:** Redis (User data, scores, leaderboard)  
**Deployment:** Render + Vercel

## 🚀 Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- Redis (Docker recommended)

### Local Development

1. **Clone and setup**
```bash
git clone <repo-url>
cd exploding-kittens
```

2. **Start Redis**
```bash
docker-compose up -d redis
```

3. **Backend**
```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

4. **Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit: http://localhost:5173

## 🌐 Deployment

### Environment Toggle
Change `ENVIRONMENT=production` in backend and `VITE_ENVIRONMENT=production` in frontend to switch between local and production configs.

### Backend (Render)
1. Connect GitHub repo to Render
2. Render auto-detects `render.yaml`
3. Sets `ENVIRONMENT=production` automatically

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Sets `VITE_ENVIRONMENT=production` automatically

## 🎮 How to Play

1. Register/Login to save your scores
2. Click "Start Game" to begin
3. Draw cards by clicking on them
4. Collect defuse cards to survive bombs
5. Avoid exploding kittens or use defuse cards
6. Clear all cards to win!

## 📊 Project Structure

```
├── render.yaml       # Render deployment config
├── backend/          # Go API server
│   ├── config/       # Environment config
│   ├── handlers/     # HTTP handlers
│   ├── middleware/   # Auth, CORS, rate limiting
│   ├── services/     # Business logic
│   ├── models/       # Data models
│   ├── main.go       # Application entry point
│   ├── go.mod        # Go dependencies
│   └── .env.example  # Environment template
├── frontend/         # React app
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   └── state/
│   ├── vercel.json   # Vercel deployment
│   ├── package.json  # Node dependencies
│   └── .env.example  # Environment template
└── docker-compose.yml # Redis for development
```

## 🗄️ Database Schema (Redis)

**Hash Tables:**
- `users` - Complete user profiles (ID, username, email, password hash, scores)
- `usernames` - Username to user ID mapping for fast lookup
- `scores` - Username to score mapping for leaderboard

## 🔧 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - User profile
- `POST /api/game/user` - Update user score
- `GET /api/game/user/:username` - Get user score
- `GET /api/game/leaderboard` - Game leaderboard

## 🧪 Testing

```bash
# Backend
cd backend && go test -v ./...

# Frontend  
cd frontend && npm test
```

## 📄 License

MIT License