import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationParams } from '../common/types/types';
export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private products: Product[] = [];
  private nextId = 1;

  findAll(params: PaginationParams): PaginatedProducts {
    const { page = 1, limit = 10, sort = 'id', order = 'ASC' } = params;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const sortedProducts = [...this.products].sort((a, b) => {
      const aValue = a[sort as keyof Product];
      const bValue = b[sort as keyof Product];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (order === 'ASC') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: this.products.length,
      page,
      limit,
    };
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`${id} ID'li ürün bulunamadı`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = new Product(createProductDto);

    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException(`${id} ID'li ürün bulunamadı`);
    }

    const updatedProduct = {
      ...this.products[index],
      ...updateProductDto,
      updatedAt: new Date(),
    };

    this.products[index] = updatedProduct;
    this.logger.log(`${id} ID'li ürün güncellendi`);
    return updatedProduct;
  }

  remove(id: number): void {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException(`${id} ID'li ürün bulunamadı`);
    }

    this.products.splice(index, 1);
    this.logger.log(`${id} ID'li ürün silindi`);
  }
}
