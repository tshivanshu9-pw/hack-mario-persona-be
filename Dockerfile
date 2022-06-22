# Specifying the base image
FROM node:16

# Working Directory in container, Commands will be issued relative to this dir
WORKDIR /usr/src/app

# Copy all Remaining Code/ Add folders like node_modules in .dockerignore
COPY . .

# Install All Dependencies
RUN npm install

#Set command to run 
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main"]
