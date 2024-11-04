package handlers

import (
	"backend/models"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateOrUpdateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Update the user's score
	services.UpdateScore(user.Username, user.Score)

	// Respond with success and include the user's username and score
	c.JSON(http.StatusOK, gin.H{
		"status":   "success",
		"username": user.Username,
		"score":    user.Score,
	})
}

func GetUserStatus(c *gin.Context) {
	username := c.Param("username")
	score := services.GetScore(username)
	c.JSON(http.StatusOK, gin.H{"username": username, "score": score})
}

func GetLeaderboard(c *gin.Context) {
	leaderboard := services.GetLeaderboard()
	c.JSON(http.StatusOK, leaderboard)
}
