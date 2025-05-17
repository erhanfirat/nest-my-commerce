import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StockService } from './stock.service';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @EventPattern('order_created')
  handleOrderCreated(@Payload() payload: any) {
    this.stockService.decreaseStock(payload.orderItems);
  }
}
