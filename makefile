# Makefile

## Global
up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose down && docker compose up --build  -d

## USERS
users-up:
	docker compose up --build --no-deps -d users-microservice

users-down:
	docker compose stop users-microservice

users-restart:
	docker compose restart users-microservice

## PRODUCTS
products-up:
	docker compose up --build --no-deps -d products-microservice

products-down:
	docker compose stop products-microservice

products-restart:
	docker compose restart products-microservice

## AUTH
auth-up:
	docker compose up --build --no-deps -d auth-microservice

auth-down:
	docker compose stop auth-microservice

auth-restart:
	docker compose restart auth-microservice

## API GATEWAY
gateway-up:
	docker compose up --build --no-deps api-gateway

gateway-down:
	docker compose stop api-gateway

gateway-restart:
	docker compose restart api-gateway