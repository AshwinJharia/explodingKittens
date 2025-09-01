package services

import (
	"backend/config"
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/redis/go-redis/v9"
)

var (
	ctx = context.Background()
	rdb *redis.Client
)

func InitRedis(cfg *config.Config) {
	if cfg.IsProduction && cfg.RedisURL != "" {
		options, err := redis.ParseURL(cfg.RedisURL)
		if err != nil {
			log.Fatalf("Failed to parse Redis URL: %v", err)
		}
		rdb = redis.NewClient(options)
	} else {
		rdb = redis.NewClient(&redis.Options{
			Addr: cfg.RedisAddr,
		})
	}

	if err := rdb.Ping(ctx).Err(); err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	log.Println("Connected to Redis successfully")
}

func UpdateScore(username string, score int) error {
	if username == "" {
		return fmt.Errorf("username cannot be empty")
	}
	return rdb.HSet(ctx, "scores", username, score).Err()
}

func GetScore(username string) (int, error) {
	if username == "" {
		return 0, fmt.Errorf("username cannot be empty")
	}
	score, err := rdb.HGet(ctx, "scores", username).Int()
	if err == redis.Nil {
		return 0, nil
	}
	return score, err
}

func GetLeaderboard() (map[string]int, error) {
	leaderboard := make(map[string]int)
	scores, err := rdb.HGetAll(ctx, "scores").Result()
	if err != nil {
		return nil, err
	}

	for username, score := range scores {
		if intScore, err := strconv.Atoi(score); err != nil {
			log.Printf("Invalid score for user %s: %s", username, score)
		} else {
			leaderboard[username] = intScore
		}
	}
	return leaderboard, nil
}
