FROM node:21 as dev
# Build args
RUN mkdir /tmp/react
COPY package.json /tmp/react/
RUN cd /tmp/react && npm install
COPY ./src /tmp/react/src/
COPY ./public /tmp/react/public/
COPY ./webpack.config.js /tmp/react/
RUN cd /tmp/react && npm run build

# Use an official Node.js runtime as the base image
FROM node:21 as prod
# Set the working directory in the container to /app
WORKDIR /app
COPY package.json .
RUN npm install
#Copy files needed
COPY server.js .
COPY commit_id.json .

# Copy build result from dev to prod
RUN mkdir build
COPY --from=dev /tmp/react/build build
EXPOSE 80

# Specify the command to run when the container starts
CMD [ "node", "server.js" ]