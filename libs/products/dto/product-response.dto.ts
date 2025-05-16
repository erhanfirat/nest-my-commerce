import { Product } from "../../../products-microservice/src/products/entities/product.entity";

export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.images = product.images?.map((img) => img.url); // örneğin sadece url dönüyoruz
  }
}
