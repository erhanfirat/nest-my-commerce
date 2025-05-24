import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  CreateOrderItemDto,
  ORDER_PATTERNS,
  UpdateOrderDto,
} from '@ecommerce/types';
import { plainToInstance } from 'class-transformer';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  orderItem: CreateOrderItemDto = {
    productId: 12,
    price: 12,
    quantity: 12,
    totalPrice: 12,
  };

  @MessagePattern({ cmd: ORDER_PATTERNS.CREATE })
  create(
    @Payload()
    {
      userId,
      createOrderDto,
    }: {
      userId: number;
      createOrderDto: CreateOrderDto;
    },
  ) {
    const transformedCreateOrderDto = plainToInstance(
      CreateOrderDto,
      createOrderDto,
    );

    console.log(
      'Order Controller userId',
      userId,
      'createOrderDto',
      createOrderDto,
      transformedCreateOrderDto,
    );
    return this.ordersService.create(userId, createOrderDto);
  }

  @MessagePattern(ORDER_PATTERNS.FIND_ALL)
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern(ORDER_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern(ORDER_PATTERNS.UPDATE)
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern(ORDER_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
