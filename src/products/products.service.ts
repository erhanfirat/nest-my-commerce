import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PaginatedResult,
  PaginationParams,
  SortOrder,
} from '../common/types/types';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(params: PaginationParams): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC' } = params;

    const [data, total] = await this.productRepository.findAndCount({
      order: { [sort]: order.toUpperCase() as SortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    const updatedProduct = this.productRepository.merge(product, {
      ...updateProductDto,
      updatedAt: new Date(),
    });

    this.logger.log(`${id} ID'li ürün güncellendi`);

    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);

    this.logger.log(`${id} ID'li ürün silindi`);
  }
}
