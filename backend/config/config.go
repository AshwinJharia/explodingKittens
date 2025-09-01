package config

import "os"

type Config struct {
	Port         string
	Mode         string
	RedisURL     string
	RedisAddr    string
	JWTSecret    string
	AllowOrigins string
	IsProduction bool
}

func Load() *Config {
	env := getEnv("ENVIRONMENT", "development")
	isProduction := env == "production"

	config := &Config{
		Port:         getEnv("PORT", "8080"),
		Mode:         getEnv("GIN_MODE", "debug"),
		JWTSecret:    getEnv("JWT_SECRET", "dev-secret-key"),
		IsProduction: isProduction,
	}

	if isProduction {
		config.RedisURL = getEnv("REDIS_URL", "")
		config.AllowOrigins = getEnv("ALLOWED_ORIGINS", "https://exploding-kittens.vercel.app")
	} else {
		config.RedisAddr = getEnv("REDIS_ADDR", "localhost:6379")
		config.AllowOrigins = getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174")
	}

	return config
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}