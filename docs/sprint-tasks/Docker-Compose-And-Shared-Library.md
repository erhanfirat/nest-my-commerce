# Microservisler ve Shared Library Docker Compose Yapılanması

Bu dökümanın amacı, dev ortamında hızlı ve performanslı bir şekilde mikroservisleri shared library ile birlikte nasıl çalıştrıabileceğimizi açıklamak.

Bu yapılanmada, docker compose içinde:

- `bind mount` ve `named mount` yöntemleri kullanarak dev ortamındaki değişikliklerin containerlara anında yansıması,
- ortak kütüphane için de bir container oluşturarak her serviste kopyalamanın önüne geçmek
  hedeflenmiştir.

## Dosya yapısı

```bash
Project-Root
  api-gateway
    tsconfig.json
    dockerfile
  user-ms
    tsconfig.json
    dockerfile
  product-ms
    tsconfig.json
    dockerfile
  common
    tsconfig.json
    dockerfile
  .env
  docker-compose.yaml

```

## common Library

### tsconfig.json

```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist", // derleme dist folderına çıktı verir
    "rootDir": "./src", // src altı derlenir
    "baseUrl": "./src",
    "module": "commonjs",
    "target": "ES2020",
    "esModuleInterop": true,
    "strict": true,
    "declaration": true,
    "emitDeclarationOnly": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "types": ["node"],
    "moduleResolution": "node",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

### package.json

```json

  "name": "@my/common",
  "version": "1.0.37",
  "main": "dist/index.js",    // ana dosyası
  "types": "dist/index.d.ts", // types dosyası
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "version:patch": "standard-version --release-as patch -m \"common patch %s\"",
    "update": "npm run build && npm run version:patch && npm run postversion",
    "postversion": "npm run build && node ./scripts/update-dependents.js"
  },

```

### dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

```

### .dockerignore

Gereksiz kopyalamaları önlemek için önemli:

```dockerfile
**/node_modules
```

### docker-compose yapılanması:

```yaml
my-common:
  build:
    context: ./common
    dockerfile: Dockerfile
  volumes:
    - my-common-dist:/usr/src/app/dist # bu volume sayesinde diğer uygulamlarla paylaşabileceğiz
    - my-common-modules:/usr/src/app/node_modules
```

## api-gateway

### tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@my/common": ["../common/dist"]   // bu satır sayesinde dev esnasında tipler tespit edilebiliyor
    },
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    ...
  }
}
```

### dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app/api-gateway
# önce package.json kopyalanarak intallation başlatılır
COPY ./api-gateway/package*.json ./

RUN npm install

COPY ./api-gateway ./

CMD ["npm", "run", "start:dev"]

```

### .dockerignore

Gereksiz kopyalamaları önlemek için önemli:

```dockerfile
/dist
/node_modules
/build

```

### docker-compose yapılanması:

```yaml

my-api-gateway:
  container_name: my-api-gateway
  build:
    context: .
    dockerfile: ./api-gateway/dockerfile
  ports:
    - "${AG_PORT}:${AG_PORT}"
  environment:
    - NODE_ENV=development
    - AG_PORT=${AG_PORT}
    - AG_HOST=${AG_HOST}
  depends_on:
    - my-common
    - my-user-ms
    - my-auth-ms
    - my-story-ms
  env_file:
    - .env
  volumes:
    # Bind mount sayesinde kodda değişiklik otomatik yüklenir
    - ./api-gateway:/usr/src/app/api-gateway
    - /usr/src/app/api-gateway/node_modules
    # ortak kütüphane buradan paylaşıma alınır
    - my-common-dist:/usr/src/app/common/dist
    - my-common-modules:/usr/src/app/common/node_modules
  restart: unless-stopped
  networks:
    - my-network
```


## Diğer servisler

Diğer tüm servisler de `api-gateway` gibi ayarlanabilir. 