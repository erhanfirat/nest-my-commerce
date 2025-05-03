# E-Commerce Backend Tasks – Sprint 5

05.03.2025 Oturumu

## 1. ✅ JWT Entegrasyonu ve Protected Route Oluşturma

- [ ] `JwtModule` yapılandırmasını `.env` üzerinden dinamik hale getir (`JwtModule.registerAsync`).
- [ ] `JwtStrategy` içerisinde payload olarak token'dan `userId`, `email`, `role` gibi alanları al.
- [ ] `JwtAuthGuard` oluştur ve sadece ihtiyaç duyulan endpoint’lerde kullan.
- [ ] `RolesGuard` middleware’i yazılarak role bazlı erişim kontrolü sağlanmalı.
- [ ] `@Roles(...roles: string[])` şeklinde bir custom decorator oluşturulmalı.
- [ ] Gerekli durumlarda `ForbiddenException` ve `UnauthorizedException` kullanılarak kullanıcı bilgilendirilmeli.

---

## 2. ✅ Products, Users ve Orders Endpointlerine Route Guard Uygulama

### Products

- [ ] Ürün oluşturma ve silme işlemleri sadece `ADMIN` ve `SELLER` rollerine açık olmalı.
- [ ] Ürün listeleme tüm kullanıcılara açık olmalı (public route).

### Users

- [ ] `GET /me` endpoint’i sadece JWT doğrulaması yapılmış kullanıcıya açık olmalı. (Giriş yapmış -authenticated- kullanıcının kendi bilgilerini güvenli bir şekilde almasını sağlamaktadır. Bu endpoint genellikle frontend uygulamalarında, kullanıcı oturum açtıktan sonra profil bilgilerini, rollerini veya tercihlerini göstermek için kullanılır.)
- [ ] `GET /users` sadece `SUPER_ADMIN` rolüyle erişilebilir olmalı.

### Orders

- [ ] Sipariş oluşturma sadece giriş yapmış `USER`, `SELLER` rollerine açık olmalı.
- [ ] Sipariş listeleme yalnızca sipariş sahibine veya `ADMIN` rolüne açık olmalı.

---

## 3. ✅ MongoDB Entegrasyonu

- [ ] `MongooseModule` yapılandırması `.env` dosyasından `MONGO_URI` kullanılarak yapılmalı.
- [ ] Mongo servisi için `docker-compose.yml` dosyasına MongoDB servisi eklenmeli.
- [ ] Mongo bağlantısı sırasında hata yönetimi (`onConnectionError`) tanımlanmalı.
- [ ] Uygulama kapandığında Mongo bağlantısı düzgün bir şekilde sonlandırılmalı.

---

## 4. ✅ MongoDB ile Cart Yönetimi

- [ ] `Cart` şeması oluşturulmalı:

  - `userId: string`
  - `items: [{ productId: string, quantity: number, price: number }]`

- [ ] DTO'lar hazırlanmalı:

  - `AddToCartDto`
  - `UpdateCartDto`

- [ ] `CartService` yazılmalı:

  - [ ] Sepet oluştur veya güncelle
  - [ ] Aynı ürün varsa sadece miktarı artır
  - [ ] Sepeti görüntüleme
  - [ ] Sepeti boşaltma
  - [ ] Belirli bir ürünü sepetten çıkarma

- [ ] `CartController` endpointleri JWT koruması altında hazırlanmalı:

  - `@Post('add')`
  - `@Put('update')`
  - `@Delete('clear')`
  - `@Get()`

- [ ] User bilgisi JWT Auth ile alınmalı.

---

## 5. ✅ MongoDB ile Product Comments Yönetimi

- [ ] `ProductComment` şeması oluşturulmalı:

  - `userId`
  - `productId`
  - `comment`
  - `rating`
  - `createdAt`

- [ ] DTO hazırlanmalı: `ProductCommentDto`

- [ ] `ProductCommentService` fonksiyonları:

  - [ ] Yorum ekleme
  - [ ] Yorum silme (kendi yorumunu silme)
  - [ ] Belirli ürünün tüm yorumlarını listeleme
  - [ ] Ortalama puanı hesaplama

- [ ] `ProductCommentController`:

  - JWT ile giriş yapan kullanıcılar yorum ekleyebilmeli
  - Ürün bazlı yorum filtrelemesi yapılabilmeli

- [ ] User bilgisi JWT Auth ile alınmalı.

---

## 6. ✅ MongoDB ile User Visit History Yönetimi

- [ ] `UserVisitHistory` şeması oluşturulmalı:

  - `userId`
  - `productId`
  - `visitedAt: Date`

- [ ] Ürün görüntülendiğinde bu veri otomatik olarak kaydedilmeli (middleware veya servis).
- [ ] Aynı ürüne kısa sürede yapılan tekrar ziyaretler kayıt edilmemeli (Örneğin 10 dk içinde)
- [ ] `GET /user/visits` endpoint'iyle kullanıcı geçmişi görüntülenebilmeli.
- [ ] Maksimum 100 kayıt tutulmalı, eski kayıtlar otomatik silinmeli (opsiyonel).
- [ ] User bilgisi JWT Auth ile alınmalı.

---
