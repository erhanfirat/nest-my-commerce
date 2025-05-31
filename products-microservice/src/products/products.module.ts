import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchSyncService } from './elasticsearch/elasticsearch-sync.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ElasticsearchSyncService],
})
export class ProductsModule {}
