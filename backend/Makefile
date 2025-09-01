.PHONY: build run test clean docker-build docker-run

# Build the application
build:
	go build -o bin/main .

# Run the application
run:
	go run main.go

# Run tests
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -rf bin/

# Build Docker image
docker-build:
	docker build -t exploding-kittens-backend .

# Run Docker container
docker-run:
	docker run -p 8080:8080 --env-file .env exploding-kittens-backend

# Install dependencies
deps:
	go mod tidy
	go mod download

# Format code
fmt:
	go fmt ./...

# Lint code
lint:
	golangci-lint run