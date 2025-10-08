# Use official Node.js Alpine image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy only package files first (for better build caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Ensure Prisma is installed and generate client
RUN npx prisma generate

# Expose the app port (match your .env PORT)
EXPOSE 4000

# Default command
CMD ["npm", "run", "dev"]
