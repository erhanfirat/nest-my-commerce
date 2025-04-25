import {
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MinLength(10)
  @Transform(({ value }) => value.trim())
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
