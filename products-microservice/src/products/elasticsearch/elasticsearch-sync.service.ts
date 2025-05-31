import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from '../entities/product.entity';

@Injectable()
export class ElasticsearchSyncService implements OnModuleInit {
  constructor(private readonly esService: ElasticsearchService) {}

  async onModuleInit() {
    const indexExists = await this.esService.indices.exists({
      index: 'products_v3',
    });

    if (!indexExists) {
      await this.esService.indices.create({
        index: 'products_v3',
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text', analyzer: 'synonym_analyzer' },
            description: { type: 'text', analyzer: 'synonym_analyzer' },
            price: { type: 'float' },
            stock: { type: 'integer' },
            category: { type: 'keyword' },
          },
        },
        settings: {
          analysis: {
            filter: {
              synonyms_filter: {
                type: 'synonym',
                synonyms: ['bellek, ram, hafıza', 'babakart, anakart'],
              },
            },
            analyzer: {
              synonym_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                filter: ['lowercase', 'synonyms_filter'],
              },
            },
          },
        },
      });
    }
  }

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
        stock: product.stock,
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
