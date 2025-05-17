import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.ORDERS.name,
        transport: Transport.TCP,
        options: {
          host: SERVICES.ORDERS.host,
          port: SERVICES.ORDERS.port,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
