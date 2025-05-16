import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './common/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { UserVisitModule } from './user-visit/user-visit.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    ProductsModule,
    PaymentModule,
    AuthModule,
    // OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get<string>('POSTGRES_HOST'),
    //     port: config.get<number>('POSTGRES_PORT'),
    //     username: config.get<string>('POSTGRES_USER'),
    //     password: config.get<string>('POSTGRES_PASSWORD'),
    //     database: config.get<string>('POSTGRES_DB'),
    //     synchronize: true,
    //     autoLoadEntities: true,
    //     entities: [__dirname + '/**/entities/*.entity.ts'],
    //     logging: true,
    //     cache: { duration: config.get<number>('TYPEORM_CACHE_DURATION') },
    //   }),
    // }),
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
  ],
})
export class AppModule {}
