# Use official Node.js 20 image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install --force

# Copy the rest of the backend code
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to start the backend
CMD ["node", "src/server.js"]
