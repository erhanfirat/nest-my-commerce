export declare class CreateOrderItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export declare class CreateOrderDto {
    userId: number;
    orderItems: CreateOrderItemDto[];
    totalPrice: number;
}
