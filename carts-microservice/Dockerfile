FROM node:20-alpine

WORKDIR /usr/src/app/carts-microservice

COPY ./carts-microservice/package*.json ./

RUN npm install

COPY ./carts-microservice ./

CMD ["npm", "run", "start:dev"]