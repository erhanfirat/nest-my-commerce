import { IsNumber } from 'class-validator';

export class AddVisitDto {
  @IsNumber()
  productId: number;
}
