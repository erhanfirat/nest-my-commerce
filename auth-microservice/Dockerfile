FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./auth-microservice ./auth-microservice

WORKDIR /usr/src/app/auth-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]