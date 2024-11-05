package services

import (
	"context"
	"os" //used for remote redis instance access - comment if running local remote instance access
	"strconv"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

//to run redis instance locally - uncomment this commented part

// var rdb = redis.NewClient(&redis.Options{
// 	Addr:     "localhost:6379",
// 	Password: "",
// 	DB:       0,
// })

//uncomment uptil here to run redis instance locally and comment below specified part (remote redis instance access)


//here starts is the remote connection for redis instance part, comment it if using redis locally
func NewRedisClient() *redis.Client {
	redisURL := os.Getenv("REDIS_URL")
	options, err := redis.ParseURL(redisURL)
	if err != nil {
		panic(err)
	}

	return redis.NewClient(options)
}
var rdb = NewRedisClient()
// uptill here is the remote connection for redis instance part, comment it if using redis locally.



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
