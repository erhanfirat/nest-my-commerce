FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./users-microservice ./users-microservice

WORKDIR /usr/src/app/users-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]