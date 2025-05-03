import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class ProductCommentDto {
  @IsOptional()
  userId: number;

  @IsNotEmpty()
  productId: number;

  @IsOptional()
  comment: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
}
