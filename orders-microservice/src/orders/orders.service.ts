import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderDto,
  ORDER_KAFKA_EVENTS,
  OrderCreatedEvent,
  PRODUCT_PATTERNS,
  ProductType,
  SERVICES,
  UpdateOrderDto,
} from '@ecommerce/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,

    @Inject(SERVICES.KAFKA.name) private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  async create(userId: number, dto: CreateOrderDto) {
    // const order = this.orderRepository.create({
    //   totalPrice: dto.totalPrice,
    //   userId,
    // });
    // const savedOrder = await this.orderRepository.save(order);

    // const orderItems: OrderItem[] = [];

    // for (const itemDto of dto.orderItems) {
    //   const product = await firstValueFrom(
    //     this.productsMicroservice.send(
    //       { cmd: PRODUCT_PATTERNS.FIND_ONE },
    //       { id: itemDto.productId },
    //     ),
    //   );

    //   if (!product) {
    //     throw new Error(`Product with id ${itemDto.productId} not found`);
    //   }

    //   const orderItem = this.orderItemRepository.create({
    //     productId: product.id,
    //     order: savedOrder,
    //     quantity: itemDto.quantity,
    //     price: itemDto.unitPrice,
    //     totalPrice: itemDto.totalPrice,
    //   });
    //   orderItems.push(orderItem);
    // }

    // await this.orderItemRepository.save(orderItems);

    // KAFKA EVENT EMIT
    const newOrderCreated: OrderCreatedEvent = {
      orderId: 123,
      userId: 2,
      items: [
        {
          productId: 3,
          quantity: 5,
        },
      ],
      totalPrice: 500,
    };

    this.kafkaClient.send(ORDER_KAFKA_EVENTS.ORDER_CREATED, newOrderCreated);

    return 'oldu bu iş';
    // this.orderRepository.findOne({
    //   where: { id: savedOrder.id },
    //   relations: ['items'],
    // });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(id, updateOrderDto);
    return '';
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items'],
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
