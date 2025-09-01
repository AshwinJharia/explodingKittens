package handlers

import (
	"backend/models"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateOrUpdateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input: "+err.Error())
		return
	}

	if user.Username == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Username is required")
		return
	}

	if err := services.UpdateScore(user.Username, user.Score); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update score")
		return
	}

	utils.SuccessResponse(c, gin.H{
		"username": user.Username,
		"score":    user.Score,
	})
}

func GetUserStatus(c *gin.Context) {
	username := c.Param("username")
	if username == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Username is required")
		return
	}

	score, err := services.GetScore(username)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get user score")
		return
	}

	utils.SuccessResponse(c, gin.H{
		"username": username,
		"score":    score,
	})
}

func GetLeaderboard(c *gin.Context) {
	leaderboard, err := services.GetLeaderboard()
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get leaderboard")
		return
	}

	utils.SuccessResponse(c, leaderboard)
}
