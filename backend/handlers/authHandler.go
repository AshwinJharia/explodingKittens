package handlers

import (
	"backend/models"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var req models.User
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input: "+err.Error())
		return
	}

	existingUser, _ := services.GetUserByUsername(req.Username)
	if existingUser != nil {
		utils.ErrorResponse(c, http.StatusConflict, "Username already exists")
		return
	}

	user, err := services.CreateUser(req.Username, req.Email, req.Password)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create user")
		return
	}

	token, err := services.GenerateToken(user.ID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate token")
		return
	}

	utils.SuccessResponse(c, models.AuthResponse{
		Token: token,
		User:  *user,
	})
}

func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input: "+err.Error())
		return
	}

	user, err := services.GetUserByUsername(req.Username)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	if !services.CheckPassword(req.Password, user.Password) {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	token, err := services.GenerateToken(user.ID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate token")
		return
	}

	user.Password = ""
	utils.SuccessResponse(c, models.AuthResponse{
		Token: token,
		User:  *user,
	})
}

func GetProfile(c *gin.Context) {
	userID := c.GetString("user_id")
	user, err := services.GetUserByID(userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	utils.SuccessResponse(c, user)
}