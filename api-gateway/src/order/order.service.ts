import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import {
  PRODUCT_PATTERNS,
  ProductType,
  SERVICES,
  USER_PATTERNS,
  UserType,
} from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
  ) {}

  async createOrder(
    userId: number,
    dto: CreateOrderDto,
  ): Promise<Order | null> {
    const order = this.orderRepository.create({
      totalPrice: dto.totalPrice,
      userId,
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItems: OrderItem[] = [];

    for (const itemDto of dto.orderItems) {
      const product = (await firstValueFrom(
        this.productsMicroservice.send(
          { cmd: PRODUCT_PATTERNS.FIND_ONE },
          { id: itemDto.productId },
        ),
      )) as ProductType;

      if (!product) {
        throw new Error(`Product with id ${itemDto.productId} not found`);
      }

      const orderItem = this.orderItemRepository.create({
        productId: product.id,
        order: savedOrder,
        quantity: itemDto.quantity,
        price: itemDto.unitPrice,
        totalPrice: itemDto.totalPrice,
      });
      orderItems.push(orderItem);
    }

    await this.orderItemRepository.save(orderItems);

    return this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.product', 'user'],
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
