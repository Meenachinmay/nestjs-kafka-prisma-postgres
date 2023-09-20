# Development stage
FROM node:18-alpine as development

WORKDIR /usr/src/app

RUN npm install -g typescript @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# Copy the entrypoint script into the image
COPY docker-entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# Installing curl
RUN apk --no-cache add curl

# Development runtime command
ENTRYPOINT ["docker-entrypoint.sh"]