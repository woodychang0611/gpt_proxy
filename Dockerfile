# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install application dependencies in the container
RUN npm install

# Copy the rest of the application's files into the container
COPY . .

RUN npm run build

# If you only want to copy the public folder, use this line instead of the above "COPY . .":
# COPY ./public ./public
EXPOSE 80

# Specify the command to run when the container starts
CMD [ "node", "server.js" ]