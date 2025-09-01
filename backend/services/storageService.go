package services

import (
	"backend/config"
	"fmt"
	"log"
	"strconv"
)

// Storage interface for abstraction
type Storage interface {
	HSet(table, key, value string) error
	HGet(table, key string) (string, error)
	HGetAll(table string) (map[string]string, error)
}

var storage Storage

// Initialize storage based on config
func InitStorage(cfg *config.Config) {
	if cfg.UseMemoryStore {
		storage = NewMemoryStorage()
		log.Println("Using in-memory storage")
	} else {
		storage = NewRedisStorage(cfg)
		log.Println("Using Redis storage")
	}
}

// Unified storage functions
func UpdateScore(username string, score int) error {
	if username == "" {
		return fmt.Errorf("username cannot be empty")
	}
	return storage.HSet("scores", username, strconv.Itoa(score))
}

func GetScore(username string) (int, error) {
	if username == "" {
		return 0, fmt.Errorf("username cannot be empty")
	}
	scoreStr, err := storage.HGet("scores", username)
	if err != nil {
		return 0, nil // Return 0 for new users
	}
	return strconv.Atoi(scoreStr)
}

func GetLeaderboard() (map[string]int, error) {
	leaderboard := make(map[string]int)
	scores, err := storage.HGetAll("scores")
	if err != nil {
		return nil, err
	}

	for username, scoreStr := range scores {
		if score, err := strconv.Atoi(scoreStr); err == nil {
			leaderboard[username] = score
		}
	}
	return leaderboard, nil
}

// User storage functions
func StoreUser(userID string, userData []byte) error {
	return storage.HSet("users", userID, string(userData))
}

func GetUser(userID string) ([]byte, error) {
	data, err := storage.HGet("users", userID)
	if err != nil {
		return nil, err
	}
	return []byte(data), nil
}

func StoreUsername(username, userID string) error {
	return storage.HSet("usernames", username, userID)
}

func GetUserID(username string) (string, error) {
	return storage.HGet("usernames", username)
}