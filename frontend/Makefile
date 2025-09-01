.PHONY: install dev build preview lint format test clean docker-build docker-run

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Lint code
lint:
	npm run lint

# Fix linting issues
lint-fix:
	npm run lint:fix

# Format code
format:
	npm run format

# Run tests
test:
	npm run test

# Clean build artifacts
clean:
	rm -rf dist node_modules

# Build Docker image
docker-build:
	docker build -t exploding-kittens-frontend .

# Run Docker container
docker-run:
	docker run -p 80:80 exploding-kittens-frontend

# Development setup
setup: install
	cp .env.example .env