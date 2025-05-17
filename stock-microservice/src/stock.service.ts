// stock-microservice/src/stock.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  constructor() {}

  decreaseStock(orderItems: Array<{ productId: number; quantity: number }>) {
    for (const item of orderItems) {
      console.log(`********* decreaseStock ********** `, item);
      // await this.productRepository.decrement(
      //   { id: item.productId },
      //   'stock',
      //   item.quantity,
      // );
    }
  }
}
