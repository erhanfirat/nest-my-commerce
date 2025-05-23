import { IsNotEmpty } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  unitPrice: number;
  @IsNotEmpty()
  totalPrice: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
  @IsNotEmpty()
  totalPrice: number;
}
