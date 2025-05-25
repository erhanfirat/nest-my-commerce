import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CapitalizeNamePipe } from '../common/pipes/capitalize-name.pipe';
import {
  SearchablePaginationParams,
  UserRole,
  CreateProductDto,
  UpdateProductDto,
  SortOrder,
} from '@ecommerce/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @CacheTTL(10000)
  findAll(@Query() query: SearchablePaginationParams) {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const sort = query.sort || 'id';
    const order = (query.order || 'asc').toUpperCase() as SortOrder;
    const search = '';

    console.log('Products FindAll DB den geldi');

    return this.productsService.findAll({ page, limit, sort, order, search });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  @HttpCode(HttpStatus.CREATED)
  create(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
  ) {
    console.log(
      'api-gateway controller > update id , updateProductDto',
      id,
      updateProductDto,
    );

    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
