import { ProductType } from "../types";

export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;

  constructor(product: ProductType) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.images = product.images?.map((img) => img.url);
  }
}
