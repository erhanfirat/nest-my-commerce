import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDto,
  PaginatedResult,
  ProductResponseDto,
  SearchablePaginationParams,
  SortOrder,
  UpdateProductDto,
} from '@ecommerce/types';
import { ElasticsearchSyncService } from './elasticsearch/elasticsearch-sync.service';
import { ProductsData } from './products_data';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject() private readonly esSyncService: ElasticsearchSyncService,
  ) {}

  async findAll(
    params: SearchablePaginationParams,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const {
      page = 1,
      limit = 10,
      sort = 'id',
      order = 'ASC',
      search = '',
    } = params;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .orderBy(`product.${sort}`, order.toUpperCase() as SortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    // Arama filtresi
    if (search) {
      query.where(
        'product.name ILIKE :search OR product.description ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [products, total] = await query.getManyAndCount();

    const data = products.map((product) => new ProductResponseDto(product));

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`${id} ID'li ürün bulunamadı`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
    });

    const savedProduct = await this.productRepository.save(product);

    await this.esSyncService.indexProduct(savedProduct);

    return savedProduct;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    console.log(
      'products ms service > update id , updateProductDto',
      id,
      updateProductDto,
    );

    // const updatedProduct = this.productRepository.merge(
    //   product,
    //   updateProductDto,
    // );

    // this.logger.log(`${id} ID'li ürün güncellendi`);

    // return await this.productRepository.save(updatedProduct);
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    await this.esSyncService.removeProduct(id);

    this.logger.log(`${id} ID'li ürün silindi`);
  }

  async bulkInsert() {
    await Promise.all(
      ProductsData.map((product: CreateProductDto) => this.create(product)),
    );
    return true;
  }
}
