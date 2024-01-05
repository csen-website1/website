# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs in
EXPOSE 80

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD [ "npm", "start" ]
