FROM node:10-alpine
EXPOSE 8000
CMD node /usr/src/app/server.js

WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY src/ /usr/src/app
