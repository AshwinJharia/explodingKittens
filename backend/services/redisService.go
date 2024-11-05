package services

import (
	"context"
	"os"
	"strconv"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

// var rdb = redis.NewClient(&redis.Options{
// 	Addr:     "localhost:6379",
// 	Password: "",
// 	DB:       0,
// })

func NewRedisClient() *redis.Client {
	redisURL := os.Getenv("REDIS_URL")
	options, err := redis.ParseURL(redisURL)
	if err != nil {
		panic(err)
	}

	return redis.NewClient(options)
}

var rdb = NewRedisClient()

func UpdateScore(username string, score int) {
	rdb.HSet(ctx, "scores", username, score)
}

func GetScore(username string) int {
	score, _ := rdb.HGet(ctx, "scores", username).Int()
	return score
}

func GetLeaderboard() map[string]int {
	leaderboard := make(map[string]int)
	scores, _ := rdb.HGetAll(ctx, "scores").Result()
	for username, score := range scores {
		leaderboard[username], _ = strconv.Atoi(score)
	}
	return leaderboard
}
