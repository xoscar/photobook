FROM node

MAINTAINER oscar-rreyes1@hotmail.com

RUN yarn global add sails

WORKDIR /usr/src/app

COPY . .
