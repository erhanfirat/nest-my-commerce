# 🧾 Sprint 7 - Sipariş Sonrası Süreçlerin Yönetimi

Bu sprintte, kullanıcı sipariş işlemini tamamladıktan sonra üç önemli iş süreci yönetilecek:

1. **Bilgilendirme (Mail gönderimi)**
2. **Kargo Süreci Başlatılması**
3. **Stok Güncellenmesi**

Tüm işlemler event-driven mimariye uygun olarak Kafka üzerinden yönetilecektir.

---

## ✅ Epic: Sipariş Sonrası Süreçlerin Otomasyonu

### 1. 📨 Notification Service - Mail Gönderimi

- [ ] `notifications-microservice` adında yeni bir mikroservis oluşturulmalı.
- [ ] Kafka üzerinden `order_created` event’i dinlenmeli.
- [ ] Event dinlendikten sonra ilgili kullanıcıya sipariş bilgilerini içeren bir **e-posta** gönderilmeli (NOT: E-posta gönderme işlemi zorunlu değildir)
- [ ] Servis `Kafka` üzerinden `notification-consumer` olarak yapılandırılmalı.
- [ ] Notification için temel mail şablonları hazırlanmalı (`Sipariş no`, `toplam tutar`, `tarih`, `ürün listesi`).
- [ ] BONUS: Mail gönderimi için `nodemailer` gibi bir paket kullanılmalı (veya SMTP entegrasyonu yapılmalı).

---

### 2. 📦 Shipping Service - Kargo Sürecinin Başlatılması

- [ ] `shipping-microservice` adında yeni bir mikroservis oluşturulmalı.
- [ ] Kafka üzerinden `order_created` event’i dinlenmeli.
- [ ] Siparişteki ürünlerin kargo gönderimi için kargo kaydı oluşturulmalı (dummy veri yeterlidir).
- [ ] Her sipariş için shipping status (`pending`, `shipped`, `delivered`) izlenebilir olmalı.
- [ ] Kargo bilgileri basit bir `in-memory store`, SQLite ya da MongoDB küçük bir DB ile tutulabilir.
- [ ] BONUS: Kargo bilgisi oluşturulduğunda bir `order_shipping_created` event’i Kafka ile publish edilebilir (opsiyonel).

---

### 3. 📉 Stok Güncelleme - Product Service Entegrasyonu

- [ ] Kafka event’i (örnek: `order_created`) `stock-microservice` tarafından dinlenmeli.
- [ ] `stock-microservice` var olan `products-microservice` içinde bir domain olarak veya bağımsız servis olarak yapılandırılabilir.
- [ ] Siparişteki her ürün için ilgili ürünün `stock` değeri azaltılmalı.
- [ ] BONUS: Eğer stok yetersizse loglama yapılmalı veya ayrı bir `stock_warning` event’i gönderilmeli (opsiyonel).
- [ ] `products` servisi zaten `TCP` üzerinden çalışıyorsa, Kafka ile birlikte hem TCP hem event consumer barındırabilir veya ayrı servis olarak yapılandırılabilir.

---

## 🔗 Ortak Yapılandırmalar

- [ ] Tüm servislerde ortak Kafka bağlantısı `.env` dosyalarından çekilecek şekilde yapılandırılmalı:
  - `KAFKA_BROKER=kafka:9092`
  - `KAFKA_CLIENT_ID`
  - `KAFKA_CONSUMER_GROUP_ID`
- [ ] Topic: `order_created`
- [ ] Event payload (örnek):

```json
{
  "orderId": 123,
  "userId": 7,
  "totalPrice": 850,
  "items": [
    {
      "productId": 12,
      "quantity": 2
    },
    {
      "productId": 45,
      "quantity": 1
    }
  ]
}
```
