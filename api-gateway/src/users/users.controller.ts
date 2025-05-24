import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  PaginationParams,
  UpdateUserDto,
  UserRole,
} from '@ecommerce/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { OwnerOrRolesGuard } from 'src/auth/guards/owner-or-roles.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('users')
@UseInterceptors(CacheInterceptor) // Tüm Controller'daki GET istekleri için cache'i etkinleştir
@CacheTTL(300) // Tüm GET istekleri için varsayılan 5 dakika TTL
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() query: PaginationParams) {
    console.log('findAll DB den geldi!');
    return this.usersService.findAll({
      page: query.page ? query.page : 1,
      limit: query.limit ? query.limit : 10,
      sort: query.sort || 'id',
      order: query.order || 'ASC',
    });
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('product_id') // CacheKey'i dinamik yapmak için özel bir implementasyon gerekebilir,
  // veya CacheInterceptor'ın varsayılan 'URL tabanlı' anahtarını kullanın.
  @CacheTTL(60000) // 1 dakika cache'te tut
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, {
      ...updateUserDto,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  private async clearProductCaches(specificId?: number): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();
    const productKeys = keys.filter((key) => key.startsWith('/products'));
    for (const key of productKeys) {
      await this.cacheManager.del(key);
    }
    if (specificId) {
      await this.cacheManager.del(`/products/${specificId}`);
    }
    console.log('API Gateway cacheleri temizlendi.');
  }
}
