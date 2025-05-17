FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./libs ./libs

COPY ./stocks-microservice ./stocks-microservice

WORKDIR /usr/src/app/stocks-microservice

RUN npm install

CMD ["npm", "run", "start:dev"]