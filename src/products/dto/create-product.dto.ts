import {
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString({ message: 'İsim alanı metin olmalıdır' })
  @MinLength(3, { message: 'İsim en az 3 karakter olmalıdır' })
  @MaxLength(100, { message: 'İsim en fazla 100 karakter olmalıdır' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString({ message: 'Açıklama alanı metin olmalıdır' })
  @MinLength(10, { message: 'Açıklama en az 10 karakter olmalıdır' })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsNumber({}, { message: 'Fiyat sayı olmalıdır' })
  @Min(0, { message: 'Fiyat 0 veya daha büyük olmalıdır' })
  @Type(() => Number)
  price: number;

  @IsNumber({}, { message: 'Stok sayı olmalıdır' })
  @Min(0, { message: 'Stok 0 veya daha büyük olmalıdır' })
  @Type(() => Number)
  stock: number;

  @IsUrl({}, { message: 'Geçerli bir URL adresi giriniz' })
  @IsOptional()
  imageUrl?: string;

  @IsString({ message: 'Kategori alanı metin olmalıdır' })
  @IsOptional()
  category?: string;
}
