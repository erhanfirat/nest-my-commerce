import { ProductType } from "../types";
export declare class ProductResponseDto {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    constructor(product: ProductType);
}
