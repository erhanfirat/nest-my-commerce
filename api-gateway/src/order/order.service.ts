import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, ORDER_PATTERNS, SERVICES } from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject(SERVICES.ORDERS.name)
    private readonly ordersMicroservice: ClientProxy,
  ) {}

  create(userId: number, createOrderDto: CreateOrderDto) {
    console.log('order service ', userId, createOrderDto);
    return this.ordersMicroservice.send(
      { cmd: ORDER_PATTERNS.CREATE },
      { userId, createOrderDto },
    );
  }

  findAll() {
    return this.ordersMicroservice.send(
      {
        cmd: ORDER_PATTERNS.FIND_ALL,
      },
      {},
    );
  }

  findOne(id: number) {
    return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.FIND_ONE }, id);
  }

  remove(id: number) {
    return this.ordersMicroservice.send({ cmd: ORDER_PATTERNS.REMOVE }, id);
  }
}
