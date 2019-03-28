FROM node:10-alpine
EXPOSE 8000
WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn
COPY src src
CMD node src/server.js
