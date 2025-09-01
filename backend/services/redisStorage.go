package services

import (
	"backend/config"
	"context"
	"fmt"
	"log"

	"github.com/redis/go-redis/v9"
)

type RedisStorage struct {
	client *redis.Client
	ctx    context.Context
}

func NewRedisStorage(cfg *config.Config) *RedisStorage {
	var client *redis.Client
	ctx := context.Background()

	if cfg.IsProduction && cfg.RedisURL != "" {
		options, err := redis.ParseURL(cfg.RedisURL)
		if err != nil {
			log.Fatalf("Failed to parse Redis URL: %v", err)
		}
		client = redis.NewClient(options)
	} else {
		client = redis.NewClient(&redis.Options{
			Addr: cfg.RedisAddr,
		})
	}

	if err := client.Ping(ctx).Err(); err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	log.Println("Connected to Redis successfully")

	return &RedisStorage{
		client: client,
		ctx:    ctx,
	}
}

func (r *RedisStorage) HSet(table, key, value string) error {
	return r.client.HSet(r.ctx, table, key, value).Err()
}

func (r *RedisStorage) HGet(table, key string) (string, error) {
	result, err := r.client.HGet(r.ctx, table, key).Result()
	if err == redis.Nil {
		return "", fmt.Errorf("key not found")
	}
	return result, err
}

func (r *RedisStorage) HGetAll(table string) (map[string]string, error) {
	return r.client.HGetAll(r.ctx, table).Result()
}