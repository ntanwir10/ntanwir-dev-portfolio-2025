
# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Set environment variables at build time with defaults that can be overridden
ARG RESEND_API_KEY
ARG CONTACT_EMAIL
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV CONTACT_EMAIL=${CONTACT_EMAIL}

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]