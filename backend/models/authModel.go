package models

import "time"

type User struct {
	ID        string    `json:"id"`
	Username  string    `json:"username" binding:"required,min=3,max=20"`
	Email     string    `json:"email" binding:"required,email"`
	Password  string    `json:"password,omitempty" binding:"required,min=6"`
	Score     int       `json:"score"`
	GamesWon  int       `json:"games_won"`
	GamesLost int       `json:"games_lost"`
	CreatedAt time.Time `json:"created_at"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}