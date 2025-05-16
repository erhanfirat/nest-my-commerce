# 📦 Ortak Tip, DTO ve Contract Yönetimi (Shared Library)

Bu proje çoklu mikroservislerden oluşmakta ve her servis kendi `package.json`’ına sahip, **NestJS monorepo yapısı kullanılmamaktadır**. Bu nedenle ortak `types`, `DTO`, `enum`, `interface` gibi tanımları merkezi ve tekrar kullanılabilir bir şekilde paylaşmak için aşağıdaki yapıyı kurmak best practice’tir.

---

## 📁 Klasör Yapısı

```bash
ecommerce-app/
├── api-gateway/
├── users-microservice/
├── products-microservice/
├── auth-microservice/
├── cart-microservice/
├── orders-microservice/
├── libs/                    # <– Ortak kodlar burada toplanır
│   ├── types/               # Enum, DTO, interface
│   ├── contracts/           # (opsiyonel) gRPC / Kafka schema’ları
│   ├── utils/               # (opsiyonel) ortak yardımcı fonksiyonlar
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── .env
```

---

## 🛠️ Kurulum Adımları

### 1. Ortak Kütüphane Başlat

```bash
mkdir -p libs/types
cd libs
npm init -y
```

### 2. Örnek Enum ve DTO Oluştur

#### libs/types/user-role.enum.ts

```js
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}
```

#### libs/types/user-response.dto.ts

```js
import { UserRole } from "./user-role.enum";

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}
```

### 3. libs/package.json Güncelle

```json
{
  "name": "@ecommerce/types",
  "version": "1.0.0",
  "main": "index.ts",
  "types": "index.ts"
}
```

### 4. Mikroservislerde Kullanım

Her mikroservis klasöründe shared kütüphaneyi yükle:

```bash
npm install --save file:../libs
```

Veya package.json içerisine elle ekleme:

```json
"dependencies": {
  ...
  "@ecommerce/types": "file:../libs"
  ...
}
```

### 5. TypeScript paths Ayarları

Her mikroservis projesinin tsconfig.json veya tsconfig.paths.json dosyasına aşağıdaki gibi bir tanım ekleyin:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ecommerce/types": ["../libs/types"]
    }
  }
}
```

## Kullanım Örneği

users-microservice/src/users.service.ts:

```ts
import { UserRole } from "@ecommerce/types";

if (user.role === UserRole.ADMIN) {
  // ...
}
```
