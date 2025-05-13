# Portfolio Website

This is a [Next.js](https://nextjs.org) portfolio website that is containerized with Docker and deployed to AWS using GitHub Actions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Development

This project is containerized using Docker for consistent development and deployment environments. It uses a multi-stage Dockerfile with development, build, and production stages, along with Docker Compose for local development.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (required for development)

### Development Setup

The project uses Docker Compose for development with hot-reload capabilities enabled through Docker Compose Watch. The setup includes:

- Multi-stage Dockerfile with dev, build, and production stages
- Volume mounts for hot reloading
- Environment variable management
- Resource limits and health checks
- Logging configuration

### Docker Commands

```bash
# Build and start the development environment
docker compose up --build

# Start the development environment (after initial build)
docker compose up

# Enable hot-reload with Docker Compose Watch
docker compose watch

# List all containers (running and stopped)
docker ps -a

# List all Docker images
docker image ls -a

# List all Docker volumes
docker volume ls
```

### Volume Management

The project uses Docker volumes for efficient development:

```yaml
volumes:
  - .:/app                 # Mounts the entire project into the container
  - /app/node_modules     # Anonymous volume for node_modules
  - /app/.next           # Anonymous volume for Next.js build output
```

These volume mounts enable:

- Hot reloading of code changes
- Persistent node_modules in the container
- Efficient Next.js builds
- Docker Compose Watch functionality for automatic rebuilds

### Environment Variables

The development environment uses:

- Default environment file: `.env.local`
- Configurable through `ENV_FILE` variable
- Development mode by default with `NODE_ENV=development`

### Resource Management

The Docker Compose configuration includes:

- CPU limits: 1 CPU (max)
- Memory limits: 1GB (max)
- Reserved resources: 0.5 CPU, 512MB RAM
- Automatic container restart policy
- Health checks every 30 seconds

### Using Docker Compose (Development)

Create a `docker-compose.yml` file in your project root:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

Then run:

```bash
# Start the development environment
docker-compose up -d

# Stop the development environment
docker-compose down
```

### Best Practices

- Use multi-stage builds in Dockerfile for smaller production images
- Implement proper caching strategies for node_modules
- Don't run containers as root
- Use .dockerignore to exclude unnecessary files
- Set appropriate environment variables for different environments

## NOTE

- The `master` branch is used to automatically deploy the site to vercel.
- The `aws-deploy` branch is used to deploy site to AWS via CI/CD pipeline using GitHub Actions

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD:

1. **CI Pipeline**: Runs on every push and pull request to main and develop branches
   - Lints the code
   - Builds the application
   - Builds and tests the Docker image

2. **CD Pipeline**: Runs on push to main branch
   - Builds and pushes Docker image to Amazon ECR
   - Deploys the updated image to Amazon ECS

## AWS Infrastructure

The application is deployed to AWS using:

- Amazon ECR for container registry
- Amazon ECS (Fargate) for container orchestration
- Amazon CloudWatch for logs and monitoring

## Required AWS Setup

Before the CI/CD pipeline can work, you need to:

1. Create an ECR repository named `ntanwir-portfolio`
2. Create an ECS cluster named `portfolio-cluster`
3. Create an ECS service named `portfolio-service`
4. Set up the following GitHub secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

## Environment Variables for AWS

In production in AWS, these are stored in AWS Parameter Store and referenced in the task definition
