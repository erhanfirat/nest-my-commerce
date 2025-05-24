import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@ecommerce/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  orderCreatedEventHandler(@Payload() orderCreatedEvent: OrderCreatedEvent) {
    return this.appService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
