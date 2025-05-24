import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import {
  PRODUCT_PATTERNS,
  SearchablePaginationParams,
  CreateProductDto,
  UpdateProductDto,
} from '@ecommerce/types';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: PRODUCT_PATTERNS.CREATE })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.FIND_ALL })
  findAll(@Payload() params: SearchablePaginationParams) {
    return this.productsService.findAll(params);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.FIND_ONE })
  findOne(@Payload() id: number) {
    console.log('products ms > PRODUCT_PATTERNS.FIND_ONE id ', id);
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.UPDATE })
  update(
    @Payload()
    {
      id,
      updateProductDto,
    }: {
      id: number;
      updateProductDto: UpdateProductDto;
    },
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.REMOVE })
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }
}
