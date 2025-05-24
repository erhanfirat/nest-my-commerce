# Makefile
.PHONY: up services-up build services-build stop services-stop down services-down restart users users-s users-d users-r \
        api api-s api-d api-r products products-s products-d products-r \
        auth auth-s auth-d auth-r libs libs-s libs-d libs-r orders orders-s orders-d orders-r

## Global
up:
	docker compose up -d
services-up:
	docker compose up -d api-gateway users-microservice auth-microservice products-microservice orders-microservice notifications-microservice

build:
	docker compose up -d --build
services-build:
	docker compose up -d --build api-gateway users-microservice auth-microservice products-microservice orders-microservice notifications-microservice

stop:
	docker compose stop
services-stop:
	docker compose stop api-gateway users-microservice auth-microservice products-microservice orders-microservice notifications-microservice

down:
	docker compose down
services-down:
	docker compose down api-gateway users-microservice auth-microservice products-microservice orders-microservice notifications-microservice


restart:
	docker compose down && docker compose up -d
services-restart:
	docker compose down && docker compose up -d  api-gateway users-microservice auth-microservice products-microservice orders-microservice notifications-microservice

## USERS
users:
	docker compose up -d --build --no-deps users-microservice

users-s:
	docker compose stop users-microservice

users-d:
	docker compose down users-microservice

users-r:
	docker compose restart users-microservice

## API-GATEWAY
api:
	docker compose up -d --build --no-deps api-gateway

api-s:
	docker compose stop api-gateway

api-d:
	docker compose down api-gateway

api-r:
	docker compose restart api-gateway

## PRODUCTS
products:
	docker compose up --build --no-deps -d products-microservice

products-s:
	docker compose stop products-microservice

products-d:
	docker compose down products-microservice

products-r:
	docker compose restart products-microservice

## ORDERS
orders:
	docker compose up --build --no-deps -d orders-microservice

orders-s:
	docker compose stop orders-microservice

orders-d:
	docker compose down orders-microservice

orders-r:
	docker compose restart orders-microservice

## AUTH
auth:
	docker compose up --build --no-deps -d auth-microservice

auth-s:
	docker compose stop auth-microservice

auth-d:
	docker compose down auth-microservice

auth-r:
	docker compose restart auth-microservice

## SHARED LIB
libs:
	docker compose up --build --no-deps -d libs

libs-stop:
	docker compose stop libs

libs-down:
	docker compose down libs

libs-r:
	docker compose restart libs
