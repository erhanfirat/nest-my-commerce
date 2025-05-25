import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './common/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { UserVisitModule } from './user-visit/user-visit.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    ProductsModule,
    PaymentModule,
    AuthModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    CartModule,
    ProductCommentModule,
    UserVisitModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis', // Docker Compose'daki Redis servisinin adı
      port: 6379,
      ttl: 600000, // Varsayılan cache ömrü saniye cinsinden (örn: 1 saat)
      max: 1000, // Cache'te tutulacak maksimum öğe sayısı (isteğe bağlı)
      isGlobal: true, // CacheModule'ü global olarak kullanılabilir yapın
    }),
  ],
})
export class AppModule {}
