import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';
import { AuthModule } from 'src/auth/auth.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ProductSearchService } from './products-search.service';
import { ProductSearchController } from './products-search.controller';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: SERVICES.PRODUCTS.name,
        transport: Transport.TCP,
        options: {
          host: SERVICES.PRODUCTS.host,
          port: SERVICES.PRODUCTS.port,
        },
      },
    ]),
    UsersModule,
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  controllers: [ProductSearchController, ProductsController],
  providers: [ProductsService, ProductSearchService],
})
export class ProductsModule {}
