package routes

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	api.Use(middleware.RateLimit())
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
			auth.GET("/profile", middleware.AuthRequired(), handlers.GetProfile)
		}

		// Game routes
		game := api.Group("/game")
		{
			game.POST("/user", handlers.CreateOrUpdateUser)
			game.GET("/user/:username", handlers.GetUserStatus)
			game.GET("/leaderboard", handlers.GetLeaderboard)
		}
	}
}