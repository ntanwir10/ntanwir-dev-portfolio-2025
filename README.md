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

```bash
# Build the Docker image
docker build -t portfolio .

# Run the Docker container
docker run -p 3000:3000 portfolio
```

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

## Environment Variables

The application uses environment variables for configuration. In production, these are stored in AWS Parameter Store and referenced in the task definition.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!