package main

import (
	"backend/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5174", "http://localhost:5173"}, // Replace with your allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/api/user", handlers.CreateOrUpdateUser)
	r.GET("/api/leaderboard", handlers.GetLeaderboard)
	r.GET("/api/user/:username", handlers.GetUserStatus)

	r.Run(":8080") // Run server on localhost:8080
}
