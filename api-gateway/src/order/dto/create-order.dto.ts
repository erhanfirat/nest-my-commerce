export class CreateOrderItemDto {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export class CreateOrderDto {
  userId: number;
  orderItems: CreateOrderItemDto[];
  totalPrice: number;
}
