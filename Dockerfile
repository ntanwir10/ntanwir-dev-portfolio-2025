# Set base image as build argument
ARG NODE_VERSION=18
ARG BASE_IMAGE=node:${NODE_VERSION}-alpine

# Build stage
FROM ${BASE_IMAGE} AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG RESEND_API_KEY
ARG NEXT_PUBLIC_SITE_URL

# Build the application
RUN npm run build

# Production stage
FROM ${BASE_IMAGE} AS runner

# Install curl for healthcheck
RUN apk --no-cache add curl

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]