export declare const PRODUCT_PATTERNS: {
    FIND_ALL: string;
    FIND_ONE: string;
    FIND_BY_EMAIL: string;
    CREATE: string;
    UPDATE: string;
    REMOVE: string;
    DECREASE_STOCK: string;
};
export type ProductImageType = {
    id: number;
    url: string;
};
export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: ProductImageType[];
    stock: number;
};
