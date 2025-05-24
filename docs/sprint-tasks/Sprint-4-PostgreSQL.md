# 📘 Sprint 4 Proje Görevleri

Bu hafta, PostgreSQL veritabanı bağlantısı ve TypeORM kullanımıyla temel bir e-ticaret backend sistemi kuracağız.  
Aşağıdaki adımları takip ederek proje tamamlanmalıdır.

---

## ✅ 1. PostgreSQL Kurulumu

- Lokal makinede PostgreSQL kurulumu yapılacak.
- Alternatif olarak Docker kullanarak PostgreSQL ayağa kaldırılabilir.
- **pgAdmin** kurulumu yapılacak.

---

## ✅ 2. Docker-Compose ile PostgreSQL, pgAdmin ve App Server Ayağa Kaldırılması

- `docker-compose.yml` dosyası hazırlanacak.
- İçerisinde:
  - `postgres` servisi
  - `pgadmin` servisi
  - `nest-app` (NodeJS NestJS uygulaması) servisi
- Ortak bir `commerce-network` oluşturulacak.
- PostgreSQL bağlantı bilgileri `.env` dosyasından alınacak.

---

## ✅ 3. TypeORM Kurulumu ve Setup

- Projeye `@nestjs/typeorm` ve `typeorm` paketleri eklenecek.
- TypeORM konfigürasyonu `.env` dosyasından alınan bilgilerle yapılacak:
  - host
  - port
  - username
  - password
  - database
- `TypeOrmModule.forRootAsync()` kullanılarak dinamik konfigürasyon yapılacak.
- `autoLoadEntities: true` ayarlanacak.

---

## ✅ 4. User, Product ve Order Entity'lerinin ve İlişkilerinin Oluşturulması

### Entity Gereksinimleri:

| Entity    | Alanlar                                                                    | İlişkiler                                                            |
| --------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| User      | id, name, email, password, isActive, birthdate, role, createdAt, updatedAt | User -> Order (OneToMany), User -> Product productsSold (OneToMany)  |
| Product   | id, name, description, price, stock, isActive, createdAt, updatedAt        | Product -> OrderItem (OneToMany), Product -> User seller (ManyToOne) |
| Order     | id, totalPrice, createdAt, updatedAt                                       | Order -> OrderItem (OneToMany), Order -> User (ManyToOne)            |
| OrderItem | id, quantity, price, totalPrice                                            | OrderItem -> Product (ManyToOne), OrderItem -> Order (ManyToOne)     |

---

## ✅ 5. Users Tablosu CRUD İşlemleri

- `CreateUserDto`, `UpdateUserDto` dosyaları oluşturulacak.
- `ValidationPipe` ile DTO validasyonu yapılacak.
- `UserService` ve `UserController` yazılacak.
- Kullanıcı oluşturma, listeleme, detay görüntüleme, güncelleme ve silme işlemleri yapılacak.
- Pagination ve Search özelliklerini User listinglerinde uygula.

---

## ✅ 6. Products Tablosu CRUD İşlemleri

- `CreateProductDto`, `UpdateProductDto` dosyaları oluşturulacak.
- Ürün oluşturma, listeleme, detay görüntüleme, güncelleme ve silme işlemleri yapılacak.
- Ürünlerin stok ve fiyat kontrolleri yapılacak.
- Pagination ve Search özelliklerini Product listinglerinde uygula.

---

## ✅ 7. Orders Tablosu CRUD İşlemleri

- Sipariş oluşturma işlemlerinde:
  - Order ve OrderItem tabloları kullanılacak.
  - Bir sipariş içinde birden fazla ürün bulunabilecek.
  - Her ürün için adet (quantity) bilgisi tutulacak.
- Sipariş listeleme işlemlerinde:
  - İlişkili kullanıcı bilgisi ve ürün bilgisi de çekilecek (JOIN).
- Sipariş güncelleme ve silme işlemleri yapılacak.

### Örnek request body datası:

```json
{
  "userId": 5,
  "orderItems": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 149.99,
      "totalPrice": 299.98
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 89.99,
      "totalPrice": 89.99
    },
    {
      "productId": 7,
      "quantity": 3,
      "price": 59.5,
      "totalPrice": 178.5
    }
  ],
  "totalPrice": 568.47
}
```

---

# 🚀 Önemli Notlar

- CRUD işlemleri yapılırken **ilişkiler** (`relations`) doğru yönetilmelidir.
- Response dataları DTO yapıları kullanılarak dış dünyaya gönderilmelidir.
- Validation ve hata yönetimi (Exception Filters) uygulanmalıdır.
- `class-transformer` ile DTO dönüşümlerini otomatikleştir.
- API dönüş formatını standartlaştırmak için Interceptor kullan.

---

# 📅 Teslim Süresi

> **Proje bitiş tarihi:** 📅 _[2025.05.01]_  
> Çalışan proje Github reposu üzerinden paylaşılacaktır. Aynı repo üzerinden devam edilebilir.
