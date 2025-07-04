# 🛒 Nest My Commerce – E-Commerce Microservices Backend

A powerful, scalable, and modern **e-commerce backend** built using **NestJS**, **PostgreSQL**, **MongoDB**, **Redis**, **Kafka**, **Elasticsearch**, and **Docker**.  
This project follows a **Modular Microservices Architecture**, enabling each service to operate independently while communicating via **TCP**, **Kafka**, and **REST** protocols.

---

## 🔧 Technologies Used

| Category           | Technologies                                                                  |
|--------------------|-------------------------------------------------------------------------------|
| **Core Framework** | [NestJS](https://nestjs.com/) – TypeScript-first progressive Node.js framework |
| **Database**       | PostgreSQL, MongoDB                                                           |
| **ORM**            | TypeORM, Mongoose                                                             |
| **Caching & Queuing** | Redis, BullMQ                                                              |
| **Event Streaming** | Kafka, Zookeeper                                                              |
| **Search Engine**  | Elasticsearch                                                                 |
| **API Gateway**    | NestJS (Custom Gateway via REST & Kafka Proxy)                               |
| **DevOps**         | Docker, Docker Compose                                                        |
| **Validation**     | class-validator, class-transformer                                            |
| **Logging**        | Built-in NestJS Logger, Elasticsearch logs                                    |

---

## 🧱 Microservices Overview

| Service                    | Description                                                                  |
|----------------------------|------------------------------------------------------------------------------|
| `api-gateway`              | Entry point for all HTTP traffic. Handles routing, authentication, etc.      |
| `auth-microservice`        | Handles user login, registration, and JWT-based authentication                |
| `users-microservice`       | Manages user data using PostgreSQL                                            |
| `products-microservice`    | Manages products, stock info, and integrates with Elasticsearch               |
| `orders-microservice`      | Handles orders, integrates with Kafka to emit order events                    |
| `notifications-microservice` | Listens for events and sends emails/notifications                          |
| `stock-microservice`       | Manages inventory and stock deduction in response to order events             |
| `libs`                     | Shared TypeScript types & logic across services                               |

---

## 🧪 Features

- ✅ Modular NestJS structure with isolated services
- ✅ Kafka-powered **event-driven architecture**
- ✅ Real-time product search with **Elasticsearch**
- ✅ Redis-backed queues using **BullMQ**
- ✅ PostgreSQL for relational data, MongoDB for flexible storage
- ✅ Custom **Validation Pipes**, **Interceptors**, and **Exception Filters**
- ✅ Scalable and containerized with **Docker Compose**

---

## 📁 Project Structure

```
nest-my-commerce/
│
├── api-gateway/
├── auth-microservice/
├── users-microservice/
├── products-microservice/
├── orders-microservice/
├── notifications-microservice/
├── stock-microservice/
├── libs/                # Shared types, DTOs, base entities
├── docker-compose.yml
└── .env                 # Centralized environment config
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nest-my-commerce.git
cd nest-my-commerce
```

### 2. Configure Environment Variables

Update the `.env` file with required PostgreSQL, MongoDB, Redis, and Kafka variables.

### 3. Build and Start Services

```bash
docker compose up --build
```

### 4. Run with Selective Services (Makefile Optional)

```bash
make users-up       # Starts only users service
make down           # Stops and removes all containers
```

---

## 🔁 Event Flow Example

1. 🧾 A user places an order via `api-gateway`
2. 📦 `orders-microservice` saves the order in PostgreSQL
3. 🚚 Emits `ORDER_CREATED` event via **Kafka**
4. 📉 `stock-microservice` listens & deducts product stock
5. 📧 `notifications-microservice` sends confirmation email
6. 📝 Product data indexed into **Elasticsearch**

---

## 🔍 Elasticsearch Integration

Products are indexed with:

```json
{
  "id": 123,
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop",
  "price": 1499.99,
  "stock": 10,
  "category": "Electronics"
}
```

Search is performed using `multi_match` queries with fuzzy logic and boosting on `name` field.

---

## 🚨 Kafka Topics (Sample)

| Event              | Publisher               | Subscribers                                 |
|--------------------|--------------------------|----------------------------------------------|
| `order.created`    | orders-microservice      | stock-microservice, notifications-microservice |
| `product.updated`  | products-microservice    | elasticsearch-sync, gateway cache             |

---

## 📚 SOLID Principles Applied

This project embraces:

- ✅ Single Responsibility in service boundaries
- ✅ Open/Closed in `NotificationChannel` architecture
- ✅ Liskov and Interface Segregation in `ProductRepository` abstraction
- ✅ Dependency Inversion through provider injection and interface usage

---

## 🧪 Testing & Debugging

Each microservice supports:

- ✅ Unit tests using `Jest`
- ✅ Logging via NestJS + Kafka + Redis
- ✅ Health checks (optional)

---

## 📌 Future Plans

- 🔐 Role-based access control (RBAC)
- 📈 Prometheus + Grafana integration
- 🌐 Multi-language product support (i18n)
- 📦 Admin panel for managing catalog, orders, users

---

## 🧑‍💻 Contributing

Feel free to fork, suggest improvements, or report issues. PRs are welcome!

---

## 📝 License

MIT License © 2025 – [Your Name or Team]

