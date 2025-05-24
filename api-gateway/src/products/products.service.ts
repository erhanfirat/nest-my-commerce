/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@ecommerce/types';

import {
  PRODUCT_PATTERNS,
  SearchablePaginationParams,
  SERVICES,
} from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
  ) {}

  findAll({
    page = 1,
    limit = 10,
    sort = 'id',
    order = 'ASC',
    search = '',
  }: SearchablePaginationParams) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.FIND_ALL },
      {
        page,
        limit,
        sort,
        order,
        search,
      },
    );
  }

  findOne(id: number) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.FIND_ONE },
      id,
    );
  }

  create(createProductDto: CreateProductDto) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.CREATE },
      createProductDto,
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.UPDATE },
      { id, ...updateProductDto },
    );
  }

  remove(id: number) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.REMOVE },
      { id },
    );
  }
}
