"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponseDto = void 0;
class ProductResponseDto {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.images = product.images?.map((img) => img.url);
    }
}
exports.ProductResponseDto = ProductResponseDto;
