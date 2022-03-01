# Specifying the base image
FROM node:lts-alpine

# Working Directory in container, Commands will be issued relative to this dir
WORKDIR /usr/src/app

# Copy over package.json
COPY package*.json ./

# Install All Dependencies
RUN npm install

# Copy all Remaining Code/ Add folders like node_modules in .dockerignore
COPY . .

#Set command to run 
RUN npm run build
