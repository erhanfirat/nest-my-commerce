import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationParams } from '../common/types/pagination.type';
import * as fs from 'fs';
import * as path from 'path';

interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  [key: string]: any;
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
      const filePath = path.join(process.cwd(), 'src/data/dummyProducts.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      const products = JSON.parse(data) as ProductData[];

      this.products = products.map((product, index: number) => ({
        ...product,
        id: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      this.nextId = this.products.length + 1;
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
