package services

import (
	"backend/config"
	"backend/models"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var cfg *config.Config

func InitAuth(c *config.Config) {
	cfg = c
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateToken(userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	})
	return token.SignedString([]byte(cfg.JWTSecret))
}

func ValidateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(cfg.JWTSecret), nil
	})
	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["user_id"].(string)
		return userID, nil
	}
	return "", fmt.Errorf("invalid token")
}

func generateID() string {
	bytes := make([]byte, 16)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}

func CreateUser(username, email, password string) (*models.User, error) {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		ID:        generateID(),
		Username:  username,
		Email:     email,
		Password:  hashedPassword,
		Score:     0,
		GamesWon:  0,
		GamesLost: 0,
		CreatedAt: time.Now(),
	}

	userData, _ := json.Marshal(user)
	err = StoreUser(user.ID, userData)
	if err != nil {
		return nil, err
	}

	err = StoreUsername(username, user.ID)
	if err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

func GetUserByUsername(username string) (*models.User, error) {
	userID, err := GetUserID(username)
	if err != nil {
		return nil, err
	}

	userData, err := GetUser(userID)
	if err != nil {
		return nil, err
	}

	var user models.User
	err = json.Unmarshal(userData, &user)
	return &user, err
}

func GetUserByID(userID string) (*models.User, error) {
	userData, err := GetUser(userID)
	if err != nil {
		return nil, err
	}

	var user models.User
	err = json.Unmarshal(userData, &user)
	if err != nil {
		return nil, err
	}
	user.Password = ""
	return &user, nil
}