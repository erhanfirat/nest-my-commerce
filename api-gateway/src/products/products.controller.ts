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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@ecommerce/types/products/dto/create-product.dto';
import { UpdateProductDto } from '@ecommerce/types/products/dto/update-product.dto';
import { CapitalizeNamePipe } from '../common/pipes/capitalize-name.pipe';
import { ProductResponseDto } from '@ecommerce/types/products/dto/product-response.dto';
import {
  PaginatedResult,
  SearchablePaginationParams,
  UserRole,
} from '@ecommerce/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query() query: SearchablePaginationParams,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const sort = query.sort || 'id';
    const order = (query.order || 'asc').toUpperCase() as SortOrder;
    const search = '';

    return this.productsService.findAll({ page, limit, sort, order, search });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}
