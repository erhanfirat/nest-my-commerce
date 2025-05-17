import { OrderCreatedEvent } from '@ecommerce/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log(' **************************************************');
    console.log(' ************ ORDER CREATED EVENT *****************');
    console.log(' **************************************************');
    console.log(orderCreatedEvent);
    // TODO: Order ile alakalı mail atılacak
  }
}
