FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./orders-microservice ./orders-microservice

WORKDIR /usr/src/app/orders-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]