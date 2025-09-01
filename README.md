# 🎮 Exploding Kittens - Single Player Game

A modern single-player implementation of the popular Exploding Kittens card game with user authentication and leaderboards.

## 🚀 Features

- **Single Player Game** - Draw cards and avoid exploding kittens
- **User Authentication** - JWT-based registration and login
- **Score Tracking** - Personal scores and global leaderboard
- **Flexible Storage** - Redis or in-memory storage via configuration
- **Responsive Design** - Works on all screen sizes (100vh/100vw)
- **Real-time Feedback** - Toast notifications for all actions

## 🏗 Tech Stack

**Backend:** Go + Gin + Redis/Memory Storage  
**Frontend:** React + Vite + Redux + Framer Motion  
**Database:** Redis (production) / In-Memory (free tier)  
**Deployment:** Render + Vercel

## 🗄️ Storage Architecture

### **Configurable Storage System:**
- **Interface-based design** - Single codebase supports multiple storage types
- **Environment-driven** - Switch storage via `USE_MEMORY_STORE` variable
- **Production ready** - Redis for persistence, Memory for free deployment

### **Storage Options:**
| Environment | Storage Type | Persistence | Cost |
|-------------|--------------|-------------|------|
| Development | Redis (local) | ✅ Persistent | Free |
| Production (Free) | In-Memory | ❌ Resets on restart | Free |
| Production (Paid) | Redis Cloud | ✅ Persistent | $7+/month |

## 🚀 Quick Start

### Prerequisites
- Go 1.21+
- Node.js 18+
- Redis (for local development)

### Local Development

1. **Clone and setup**
```bash
git clone https://github.com/yourusername/exploding-kittens.git
cd exploding-kittens
```

2. **Test with Redis (Recommended)**
```bash
# Start Redis
docker-compose up -d redis

# Backend with Redis
cd backend
cp .env.example .env
# Edit .env: USE_MEMORY_STORE=false
go mod tidy
# Set environment and run
$env:USE_MEMORY_STORE="false"; go run main.go

# Frontend
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

3. **Test with Memory Storage**
```bash
# Backend with Memory
cd backend
# Set environment and run
$env:USE_MEMORY_STORE="true"; go run main.go

# Frontend (same as above)
cd ../frontend
npm run dev
```

Visit: http://localhost:5173

## 🌐 Deployment

### Environment Configuration

**Backend Environment Variables:**
```bash
# Required
ENVIRONMENT=production|development
PORT=8080
JWT_SECRET=your-secret-key

# Storage Selection
USE_MEMORY_STORE=true|false

# Redis (if USE_MEMORY_STORE=false)
REDIS_URL=redis://user:pass@host:port
REDIS_ADDR=localhost:6379  # for development

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

**Frontend Environment Variables:**
```bash
VITE_ENVIRONMENT=production|development
VITE_API_URL=https://your-backend-domain.com
```

### Backend (Render)
1. Connect GitHub repo to Render
2. Render auto-detects `render.yaml`
3. **Free Tier**: Uses in-memory storage (`USE_MEMORY_STORE=true`)
4. **Paid Tier**: Add Redis service and set `USE_MEMORY_STORE=false`

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Environment variables set automatically via `vercel.json`

## 🎮 How to Play

1. **Register/Login** to save your scores
2. **Start Game** - Click to begin drawing cards
3. **Card Types:**
   - 😸 **Cat Cards** - Safe, go to inventory
   - 🛡️ **Defuse Cards** - Protect against bombs
   - ⏭️ **Skip Cards** - Safe, just removed
   - 🔄 **Shuffle Cards** - Reshuffle the deck
   - 💥 **Bomb Cards** - Game over unless you have defuse
4. **Win Condition** - Draw all cards without exploding
5. **Scoring** - Each win increases your score

## 📊 Project Structure

```
├── render.yaml           # Render deployment config
├── docker-compose.yml    # Redis for local development
├── LICENSE               # MIT License
├── backend/              # Go API server
│   ├── config/           # Environment configuration
│   ├── handlers/         # HTTP request handlers
│   ├── middleware/       # Auth, CORS, rate limiting
│   ├── services/         # Business logic & storage
│   │   ├── storageService.go    # Storage abstraction
│   │   ├── redisStorage.go      # Redis implementation
│   │   ├── memoryStorage.go     # Memory implementation
│   │   └── authService.go       # Authentication logic
│   ├── models/           # Data models
│   ├── main.go           # Application entry point
│   ├── go.mod            # Go dependencies
│   └── .env.example      # Environment template
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── config/       # Environment config
│   │   └── state/        # Redux store
│   ├── vercel.json       # Vercel deployment
│   ├── package.json      # Node dependencies
│   └── .env.example      # Environment template
```

## 🗄️ Database Schema

### **Redis Hash Tables:**
- `users` - Complete user profiles (ID, username, email, password hash, scores)
- `usernames` - Username to user ID mapping for fast lookup
- `scores` - Username to score mapping for leaderboard

### **Memory Storage:**
- Same structure as Redis but stored in application memory
- Data resets when server restarts (every ~15 minutes of inactivity on free tier)

## 🔧 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/profile` - Get user profile (requires auth)
- `POST /api/game/user` - Update user score
- `GET /api/game/user/:username` - Get user score
- `GET /api/game/leaderboard` - Get game leaderboard

## 🧪 Testing Storage Types

### **Test Redis Storage:**
```bash
cd backend
docker-compose up -d redis
$env:USE_MEMORY_STORE="false"; go run main.go
# Check logs: "Using Redis storage"
```

### **Test Memory Storage:**
```bash
cd backend  
$env:USE_MEMORY_STORE="true"; go run main.go
# Check logs: "Using in-memory storage"
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **CORS Protection** - Configured for specific domains
- **Rate Limiting** - Prevents API abuse
- **Environment Secrets** - No hardcoded credentials

## 🚀 Performance

- **Redis**: Sub-millisecond data access, persistent storage
- **Memory**: Nanosecond access, no network overhead
- **Frontend**: Optimized bundle, lazy loading, responsive design
- **Backend**: Efficient Go runtime, minimal dependencies

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request