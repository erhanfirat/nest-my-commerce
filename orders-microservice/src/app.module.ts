import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('ORDERS_POSTGRES_HOST'),
        port: config.get<number>('ORDERS_POSTGRES_PORT'),
        username: config.get<string>('ORDERS_POSTGRES_USER'),
        password: config.get<string>('ORDERS_POSTGRES_PASSWORD'),
        database: config.get<string>('ORDERS_POSTGRES_DB'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/**/entities/*.entity.ts'],
        logging: true,
        cache: { duration: config.get<number>('TYPEORM_CACHE_DURATION') },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
