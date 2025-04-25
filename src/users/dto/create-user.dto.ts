import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { UserRole } from '../../common/types/roles.enum';

export class CreateUserDto {
  @IsString({ message: 'Ad alanı metin olmalıdır' })
  @MinLength(2, { message: 'Ad en az 2 karakter olmalıdır' })
  @MaxLength(50, { message: 'Ad en fazla 50 karakter olmalıdır' })
  @Transform((params: TransformFnParams): string => {
    if (typeof params.value === 'string') {
      return params.value.trim();
    }
    return '';
  })
  firstName: string;

  @IsString({ message: 'Soyad alanı metin olmalıdır' })
  @MinLength(2, { message: 'Soyad en az 2 karakter olmalıdır' })
  @MaxLength(50, { message: 'Soyad en fazla 50 karakter olmalıdır' })
  @Transform((params: TransformFnParams): string => {
    if (typeof params.value === 'string') {
      return params.value.trim();
    }
    return '';
  })
  lastName: string;

  @IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })
  @Transform((params: TransformFnParams): string => {
    if (typeof params.value === 'string') {
      return params.value.toLowerCase().trim();
    }
    return '';
  })
  email: string;

  @IsString({ message: 'Şifre metin olmalıdır' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Geçerli bir rol seçiniz' })
  role: UserRole = UserRole.USER;
}
