# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable for Nest.js to run in development mode
ENV NODE_ENV=development

# Start the Nest.js application using yarn start:dev
CMD ["yarn", "start:dev"]