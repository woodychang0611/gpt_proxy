 FROM node:21 as dev
# Build args
RUN mkdir /tmp/react
COPY frontend/package.json /tmp/react/
RUN cd /tmp/react && npm install
COPY frontend/src /tmp/react/src/
COPY frontend/public /tmp/react/public/
COPY frontend/webpack.config.js /tmp/react/
RUN cd /tmp/react && npm run build

# Use an official Node.js runtime as the base image
FROM node:21 as prod
# Set the working directory in the container to /app
WORKDIR /app
COPY backend/package.json .
RUN npm install
#Copy files needed
COPY backend/server.js .
COPY backend/commit_id.json .

# Copy build result from dev to prod
RUN mkdir build
COPY --from=dev /tmp/react/build build
EXPOSE 80

# Specify the command to run when the container starts
CMD [ "node", "server.js" ]