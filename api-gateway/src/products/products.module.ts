import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.PRODUCTS.name,
        transport: Transport.TCP,
        options: {
          host: SERVICES.PRODUCTS.host,
          port: SERVICES.PRODUCTS.port,
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
