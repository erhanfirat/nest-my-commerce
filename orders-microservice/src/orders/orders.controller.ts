import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  ORDER_PATTERNS,
  UpdateOrderDto,
} from '@ecommerce/types';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(ORDER_PATTERNS.CREATE)
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
