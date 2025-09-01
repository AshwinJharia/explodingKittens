package main

import (
	"backend/config"
	"backend/middleware"
	"backend/routes"
	"backend/services"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	gin.SetMode(cfg.Mode)

	services.InitRedis(cfg)
	services.InitAuth(cfg)

	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.CORS(cfg))
	r.Use(middleware.ErrorHandler())

	routes.SetupRoutes(r)

	log.Printf("Server starting on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}