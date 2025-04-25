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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationParams } from '../common/types/pagination.type';
import { ParseIntPipe } from '@nestjs/common';
import { CapitalizeNamePipe } from '../common/pipes/capitalize-name.pipe';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: PaginationParams) {
    return this.productsService.findAll({
      page: query.page ? parseInt(String(query.page), 10) : 1,
      limit: query.limit ? parseInt(String(query.limit), 10) : 10,
      sort: query.sort || 'id',
      order: query.order || 'ASC',
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProductDto: CreateProductDto,
    @Body('name', CapitalizeNamePipe) name: string,
  ) {
    return this.productsService.create({
      ...createProductDto,
      name,
    });
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Body('name', CapitalizeNamePipe) name: string,
  ) {
    return this.productsService.update(id, {
      ...updateProductDto,
      ...(name && { name }),
    });
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.productsService.remove(id);
  }
}
