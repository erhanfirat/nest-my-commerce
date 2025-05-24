import {
  OrderCreatedEvent,
  PRODUCT_PATTERNS,
  SERVICES,
} from '@ecommerce/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
  ) {}

  orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log(' **************************************************');
    console.log(' ************ ORDER CREATED EVENT *****************');
    console.log(' **************************************************');
    console.log(orderCreatedEvent);
    // TODO: Product Clienta stock düşme mesajı gönder
    orderCreatedEvent.items.forEach((item) =>
      this.productsMicroservice.send(
        { cmd: PRODUCT_PATTERNS.DECREASE_STOCK },
        { productId: item.productId, quantity: item.quantity },
      ),
    );
  }
}
