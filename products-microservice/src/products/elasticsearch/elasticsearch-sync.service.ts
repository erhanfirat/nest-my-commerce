import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from '../entities/product.entity';

@Injectable()
export class ElasticsearchSyncService {
  constructor(private readonly esService: ElasticsearchService) {}

  async indexProduct(product: Product) {
    await this.esService.index({
      index: 'products',
      id: product.id.toString(),
      document: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      },
    });
  }

  async removeProduct(productId: number) {
    await this.esService.delete({
      index: 'products',
      id: productId.toString(),
    });
  }
}
