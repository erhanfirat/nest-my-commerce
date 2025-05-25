/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, Inject } from '@nestjs/common';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from '@ecommerce/types';

import {
  PRODUCT_PATTERNS,
  SearchablePaginationParams,
  SERVICES,
} from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async findOne(id: number): Promise<ProductResponseDto> {
    const cacheKey = `product_${id}`;
    const cachedProduct: ProductResponseDto | null =
      await this.cacheManager.get(cacheKey);

    if (cachedProduct) {
      console.log(`CACHE HIT!!! ${id} li Product datası rediste bulundu!`);
      return cachedProduct;
    }
    console.log(`CACHE MISS!!! ${id} li Product datası bulunamadı!`);

    const productRes: ProductResponseDto = await firstValueFrom(
      this.productsMicroservice.send({ cmd: PRODUCT_PATTERNS.FIND_ONE }, id),
    );

    if (productRes) {
      await this.cacheManager.set(cacheKey, productRes, 5 * 1000 * 60);
      console.log(`Cache te ${id} li Product datası Cache e yazıldı!`);
    }
    return productRes;
  }

  create(createProductDto: CreateProductDto) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.CREATE },
      createProductDto,
    );
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log(
      'api-gateway service > update id , updateProductDto',
      id,
      updateProductDto,
    );

    const updatedProduct: ProductResponseDto = await firstValueFrom(
      this.productsMicroservice.send(
        { cmd: PRODUCT_PATTERNS.UPDATE },
        { id, updateProductDto },
      ),
    );
    const cacheKey = `products_${id}`;
    await this.cacheManager.del(cacheKey);

    return updatedProduct;
  }

  remove(id: number) {
    return this.productsMicroservice.send(
      { cmd: PRODUCT_PATTERNS.REMOVE },
      { id },
    );
  }
}
