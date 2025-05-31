export declare class ProductImageDto {
    url: string;
    index: number;
}
export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: ProductImageDto[];
    category?: string;
}
