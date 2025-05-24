import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  totalPrice: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @IsNotEmpty()
  totalPrice: number;
}
