FROM node:10-alpine
EXPOSE 8000
WORKDIR /opt/app

COPY package.json yarn.lock .babelrc ./
RUN yarn
COPY src src
RUN yarn build
CMD node build
