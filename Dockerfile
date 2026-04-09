# Use the official Node.js image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the production application
RUN npm run build

# Expose the port specified by Cloud Run
EXPOSE 8080

# Start the application using the production server
CMD ["npm", "start"]
