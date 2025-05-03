import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOneByOrFail({ id: dto.userId });
    const order = this.orderRepository.create({
      totalPrice: dto.totalPrice,
      user,
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItems: OrderItem[] = [];

    for (const itemDto of dto.orderItems) {
      const product = await this.productRepository.findOneByOrFail({
        id: itemDto.productId,
      });
      const orderItem = this.orderItemRepository.create({
        product,
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
      relations: ['items', 'items.product', 'user'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.product', 'user'],
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
