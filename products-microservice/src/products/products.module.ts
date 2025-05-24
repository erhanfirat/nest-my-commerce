import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    CacheModule.register({
      store: redisStore,
      host: 'redis', // Docker Compose'daki Redis servisinin adı
      port: 6379,
      ttl: 3600, // Varsayılan cache ömrü saniye cinsinden (örn: 1 saat)
      max: 1000, // Cache'te tutulacak maksimum öğe sayısı (isteğe bağlı)
      isGlobal: true, // CacheModule'ü global olarak kullanılabilir yapın
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
