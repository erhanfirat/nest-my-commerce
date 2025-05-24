export declare class CreateOrderItemDto {
    productId: number;
    quantity: number;
    price: number;
    totalPrice: number;
}
export declare class CreateOrderDto {
    userId: number;
    orderItems: CreateOrderItemDto[];
    totalPrice: number;
}
