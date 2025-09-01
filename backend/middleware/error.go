package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) > 0 {
			err := c.Errors.Last()
			log.Printf("Error occurred: %v", err.Error())
			
			statusCode := http.StatusInternalServerError
			if c.Writer.Status() != 200 {
				statusCode = c.Writer.Status()
			}
			
			c.JSON(statusCode, gin.H{
				"error":   "An error occurred",
				"message": "Please try again later",
			})
		}
	}
}