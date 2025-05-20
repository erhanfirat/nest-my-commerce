# E-Commerce Bitirme Proje Dökümanı

Bu belge, **NestJS**, **TypeORM**, **PostgreSQL**, **MongoDB**, **JWT Auth**, **Microservice**, **TCP**, **Kafka** ve **Redis** gibi modern teknolojileri kullanarak **mikroservis mimarisi** ve **Event Driven Arcitect** ile geliştirilecek bir e-ticaret projesinin tüm görev, microservice ve modül planlamasını içerir. Her bir servis, bağımsız olarak geliştirilecek ve `docker-compose` üzerinden orkestre edilecektir. Tüm microservice'ler tek repository altında tutulmalıdır.

---

## Örnek Proje Dosya yapısı

```bash
ecommerce-app/               # <- Git repository root
├── api-gateway/
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── users-microservice/      # Users microservice (PostgreSQL)
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── auth-microservice/       # Authentication microservice (JWT, guards, login)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── products-microservice/   # Products microservice (PostgreSQL)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── libs/                   # Ortak type, contract ve tüm nesneler
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│
│   ...
│
│
├── docker-compose.yml       # Tüm servisleri ayağa kaldıran merkezi compose dosyası
└── .env                     # Ortak environment değişkenleri (istenirse)

```

## Mikroservisler ve Yapılandırma

### 1. API Gateway

- HTTP REST API giriş noktasıdır.
- Diğer mikroservislere TCP veya Kafka ile bağlanır.
- `AuthGuard`, `UserRoleGuard` gibi gateway düzeyinde koruma içerir.
- Global `.env` yapılandırması ile environment ayarları yapılır.

### 2. Users Microservice (PostgreSQL + TCP)

- Kullanıcı kayıt, güncelleme, listeleme, silme.
- Yetkilendirme için roller (`USER`, `ADMIN`, `SUPER_ADMIN`)
- Erişim: TCP üzerinden `api-gateway`.
- PostgreSQL DB kullanır

#### Veri Modlelleri

**User**

```ts
id: number;
name: string;
email: string;
password: string;
role: "USER" | "ADMIN" | "SUPER_ADMIN";
```

### 3. Auth Microservice (TCP)

- JWT Token üretme ve doğrulama
- `login`, `verify`, `me` endpointleri içermelidir.
  - `login`: user login işlemini email & password bilgisi ile gerçekleştirir. Product microservisi ile TCP üzerinden iletişime geçer.
  - `verify`: token değerini verify eder
  - `me`: token değerini verify ederek yeni token üretir ve kullanıcı profile bilgisi birlikte döndürür.

#### Veri Modelleri

**JWT Payload**

```ts
interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
```

### 4. Products Microservice (PostgreSQL + TCP)

- Ürün CRUD işlemleri
- Ürün görselleri ilişkisi (OneToMany)
- Arama, sıralama, pagination desteklemelidir
- Ürün listesi, ürün detayı Redis ile cache’lenebilir.

#### Veri Modlelleri

**Product**

```ts
id: number
name: string
description: string
price: number
stock: number
images: Image[]
```

**Product Image**

```ts
id: number;
url: string;
product_id: number;
```

**Paginated Data Format**

```ts
interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

### 5. Orders Microservice (PostgreSQL + TCP + Kafka)

- Sipariş oluşturma, görüntüleme, güncelleme
- `Order`, `OrderItem` ilişkisi
- Sipariş sonrası Kafka ile event yayınlar:
  - `ORDER_CREATED` event'i publish edilir

#### Veri Modlelleri

**Order**

```ts
id: number
userId: number
totalPrice: number
items: OrderItem[]
```

**Order Item**

```ts
id: number;
orderId: number;
productId: number;
quantity: number;
unitPrice: number;
totalPrice: number;
```

**Kafka Event: ORDER_CREATED**

```json
{
  "orderId": 1,
  "userId": 5,
  "totalPrice": 900,
  "items": [{ "productId": 12, "quantity": 2 }]
}
```

### 6. Cart Microservice (MongoDB + TCP)

- Kullanıcının sepet yönetimi (CRUD işlemleri)
- `userId` ile kullanıcıya özel sepet verisi tutulur

#### Veri Modlelleri

**Cart (MongoDB)**

```ts
userId: number
items: [
  {
    productId: number
    quantity: number
    price: number
  }
]
```

### 7. Notification Microservice (Kafka Consumer)

- `ORDER_CREATED` event’ini dinler
- Mail veya log tabanlı bildirim gönderimi
- Kafka consumer grubu: `notification-consumer`

### 8. Shipping Microservice (Kafka Consumer)

- `ORDER_CREATED` event’ini dinler
- Siparişi aldıktan sonra kargo süreci başlatır
- Kafka’dan gelen sipariş verisine göre dummy shipping kaydı oluşturur

### 9. Stock Microservice (Kafka Consumer)

- `ORDER_CREATED` event’ini dinler
- Sipariş edilen ürünlerin stoklarını günceller
- `products-microservice` ile TCP veya repository üzerinden ilişki kurar

### 10. libs Sharek Library

- Root seviyesine eklenecek olan shared kütüphanesi ile ortak tüm tip tanımları bu package içinde yapılır
- `Entity` gibi sadece bir microservice içinde kullanılan nesneler bu kütüphane içinde olmak zorunda değildir

---

## Ortak Konfigürasyon

Projede kullanılacak env bilgisi root serviyesinde `.env` dosyası ile tutulabilir. Örnek:

```env
# PostgreSQL
USERS_POSTGRES_HOST=users-pg-db
USERS_POSTGRES_PORT=5432
USERS_POSTGRES_USER=postgres
USERS_POSTGRES_PASSWORD=123456
USERS_POSTGRES_DB=users-db

# Kafka
KAFKA_HOST=kafka
KAFKA_PORT=9092
KAFKA_CLIENT_ID=api-gateway

# Auth
JWT_SECRET=supersecretkey

# MongoDB
MONGO_URI=mongodb://mongo:27017/cart-db
```
