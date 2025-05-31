import { Controller, Get, Query } from '@nestjs/common';
import { ProductSearchService } from './products-search.service';

@Controller('products/search')
export class ProductSearchController {
  constructor(private readonly searchService: ProductSearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    console.log('CONTROLLER products/search ', query);
    return this.searchService.search(query);
  }
}
