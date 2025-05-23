# Make ile Docker Servisleri Yönetimi

Bu dosyada `make` kullanarak docker service yönetimini kolaylaştırmak için hazır komutlar oluşturacağız.

## Make Kütüphanesi Kurulumu

`make` kütüphanesi işletim sisteminizde yüklü değilse aşağıdaki yönergeleri takip ederek yükleyebilirsiniz.

### MacOs

`make` Xcode Command Line Tools ile birlikte gelir. Genellikle sistemde kurulu olur.
Eğer yoksa:

```bash
xcode-select --install
veya
brew install make
```

### Linux

`make` aracı çoğu Linux dağıtımında önceden kurulu gelir. Eğer kurulu değilse, paket yöneticisiyle yüklenebilir:

- Debian/Ubuntu:

```bash
sudo apt install make
```

- RedHat/CentOS/Fedora:

```bash
sudo dnf install make
veya
sudo yum install make
```

- Arch:

```bash
sudo pacman -S make
```

### Windows

```bash
choco install make
```

## makefile oluşturma

### 1. makefile oluşturma

Proje root klasörüne `makefile` adında bir dosya oluşturulur.

### 2. CLI komutları oluşturma

`makefile` içine:

```makefile
 Makefile

## Global
up:
	docker compose up -d

up-b:
	docker compose up -d --build

stop:
	docker compose stop

down:
	docker compose down

restart:
	docker compose down && docker compose up -d

## USERS
users:
	docker compose up -d --build --no-deps users-microservice

users-stop:
	docker compose stop users-microservice

users-down:
	docker compose down users-microservice

users-restart:
	docker compose restart users-microservice

```

yukarıdaki gibi tüm servisler için gerekli docker komutları oluşturulur.

### 3. Komut çalıştırma

```bash
make up-b
make stop
make users
make users-restart
```

gibi komutlarla docker servislerini daha kolay yönetebilirsiniz.
