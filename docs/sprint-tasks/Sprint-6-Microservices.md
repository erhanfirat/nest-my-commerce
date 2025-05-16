# 🛠️ E-Commerce Uygulaması - Microservice Dönüşüm Görevleri

Bu hafta, mevcut e-commerce monolit yapısını **Microservice Mimarisi** ile yeniden yapılandıracağız. Her servis kendi veritabanına sahip olacak, servisler arası iletişim ise `TCP` protokolü ile sağlanacaktır. Tüm servisler `Docker Compose` ile orkestre edilecektir.

## 🔹 1. API Gateway Yapılandırması

- [ ] Mevcut e-commerce projesi `api-gateway` olarak yeniden yapılandırılmalı.
- [ ] Microservice'e dönüştürülen modüller (users, auth, products, orders, cart) bu projeden ayrılmalı.
- [ ] Geriye kalan ortak yapı, shared klasör, class-validator pipes, interceptors ve common utils burada kalabilir.
- [ ] API Gateway, diğer servislerle TCP üzerinden bağlantı kurmalı (`ClientsModule`).
- [ ] Gateway HTTP sunucusu rolü üstlenecek, business logic bu sunucuda yer almayacak (`JwtAuthGuards`, `Interceptors`, `Middlewares` hariç).

## 🔹 2. Users Microservice

- [ ] Yeni bir NestJS projesi `users-microservice` olarak oluşturulmalı.
- [ ] Users PostgreSQL i oluşturulup, bağlantı kurulmalı.
- [ ] User entity ve DTO yapıları oluşturulmalı.
- [ ] CRUD endpoint’leri tanımlanmalı.
- [ ] TCP microservice olarak çalışmalı (`@nestjs/microservices`).

## 🔹 3. Auth Microservice

- [ ] Yeni bir NestJS projesi `auth-microservice` olarak oluşturulmalı.
- [ ] JWT authentication sistemi kurulmalı.
- [ ] `JwtAuthGuard` yazılmalı (`auth-microservice` kullanılarak `api-gateway` içine)
- [ ] Login ve token oluşturma işlemleri yapılmalı.
- [ ] Users-microservice ile iletişim kurulmalı (kullanıcıyı doğrulamak için)
- [ ] TCP üzerinden hizmet vermeli.

## 🔹 4. Products Microservice

- [ ] `products-microservice` adında yeni bir NestJS microservice projesi oluşturulmalı.
- [ ] PostgreSQL bağlantısı yapılmalı.
- [ ] Ürün CRUD işlemleri uygulanmalı.
- [ ] Ürünler kullanıcıya bağlı olarak listelenmeli (örn. sellerId).
- [ ] Ürünlere ait görseller de dahil edilecek.
- [ ] TCP ile dışarıya açılmalı.

## 🔹 5. Orders Microservice

- [ ] `orders-microservice` microservice projesi kurulmalı.
- [ ] PostgreSQL bağlantısı yapılmalı.
- [ ] Order ve OrderItem entity’leri oluşturulmalı.
- [ ] Sipariş oluşturma, listeleme, detay ve silme işlemleri yapılmalı.
- [ ] Sipariş birden fazla ürünü içermeli (OrderItem).
- [ ] TCP ile dış servislerden çağrılabilir olmalı.

## 🔹 6. Cart Microservice (MongoDB)

- [ ] `cart-microservice` microservice olarak kurulmalı.
- [ ] MongoDB bağlantısı yapılmalı.
- [ ] Kullanıcının sepet verisi `userId` ile tutulmalı.
- [ ] `addToCart`, `removeItem`, `clearCart`, `getCart` endpoint’leri yazılmalı.
- [ ] Ürün detayları cache-like olacak (name, price).
- [ ] TCP olarak gateway’e bağlanmalı.

## 🔹 7. Docker Compose Yapılanması

- [ ] Her servis için ayrı Dockerfile tanımlanmalı (production ve dev versiyonları ayrı olabilir).
- [ ] Docker Compose dosyası:
  - API Gateway (HTTP sunucu)
  - Users-microservice (PostgreSQL)
  - Auth-microservice
  - Products-microservice (PostgreSQL)
  - Orders-microservice (PostgreSQL)
  - Cart-microservice (MongoDB)
- [ ] Servisler ortak bir Docker ağı (bridge) içinde çalışmalı.
- [ ] Her servis sağlıklı çalıştığında diğerleri başlatılmalı (`depends_on`, `healthcheck`).

---

## 📝 Notlar

- JWT doğrulaması Auth-microservice tarafından yapılacak, `api-gateway` sadece guard'ları uygulayacak.
- Her servis için kendi `.env` dosyası oluşturulmalı.
- `class-validator`, `class-transformer` ve `DTO` kullanımı zorunludur.
- API Gateway üzerinden yapılan isteklerde tüm yanıtlar interceptor ile `success: true/false` formatında dönülmelidir.

## 📁 Repository Yapısı Hakkında

Bu projede tüm microservice'ler **tek bir Git repository (tek repo)** altında tutulabilir, ancak her bir servis **bağımsız bir NestJS uygulaması** olarak yapılandırılacaktır. Yani:

- **NestJS Monorepo yapısı kullanılmayacak.**
- Her servis kendi `package.json`, `tsconfig.json`, `.env`, `Dockerfile` ve bağımsız yapıya sahip olacak.
- Ortak network ve build ihtiyaçları için bir adet merkezi `docker-compose.yml` dosyası kullanılacaktır.
- Her servis kendi içinde bağımsız şekilde build edilebilir ve ayağa kaldırılabilir olacak.
- Servisler arası iletişim için TCP protokolü olacak.

Bu yapı, hem dağıtık servislerin izolasyonunu korur hem de merkezi bir repository yönetimi sağlar.

### Örnek Dosya Yapısı

```bash
ecommerce-app/               # <- Git repository root
├── api-gateway/             # Ana HTTP giriş noktası (eski proje burada yeniden yapılandırılır)
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
├── orders-microservice/     # Order + OrderItem microservice (PostgreSQL)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── cart-microservice/       # Cart microservice (MongoDB)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml       # Tüm servisleri ayağa kaldıran merkezi compose dosyası
└── .env                     # Ortak environment değişkenleri (istenirse)

```
