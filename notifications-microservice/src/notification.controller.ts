import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@ecommerce/types';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log(' **************************************************');
    console.log(' ************ ORDER CREATED EVENT *****************');
    console.log(' **************************************************');
    console.log(orderCreatedEvent);
    return this.notificationService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
