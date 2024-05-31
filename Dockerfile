# Use the official Node.js image from the Docker Hub
FROM node:21-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application files into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the Vite server will run on (5173)
EXPOSE 8081 3306

# Specify the command to run when the container starts
CMD ["npm", "run", "dev", "--", "--host"]
