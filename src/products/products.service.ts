import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationParams } from '../common/types/pagination.type';
import { dummyProducts } from '../common/utils/data';

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

  constructor() {
    this.loadDummyData();
  }

  private loadDummyData(): void {
    try {
      // dummyProducts içerisindeki veri formatını Product entity formatına dönüştürüyoruz
      this.products = dummyProducts.map((product, index: number) => {
        return {
          id: product.id || index + 1,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl:
            product.images && product.images.length > 0
              ? product.images[0].url
              : undefined,
          category: product.category_id
            ? `Kategori ${product.category_id}`
            : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      this.nextId = Math.max(...this.products.map((product) => product.id)) + 1;
      this.logger.log(`${this.products.length} ürün yüklendi`);
    } catch (error) {
      this.logger.error(
        'Dummy ürün verileri yüklenemedi',
        error instanceof Error ? error.stack : '',
      );
      this.products = [];
    }
  }

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
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(newProduct);
    this.logger.log(`Yeni ürün oluşturuldu, ID: ${newProduct.id}`);
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
