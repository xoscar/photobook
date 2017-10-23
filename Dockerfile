FROM node

MAINTAINER oscar-rreyes1@hotmail.com

RUN yarn global add sails pm2 grunt

WORKDIR /usr/src/app

COPY . .
