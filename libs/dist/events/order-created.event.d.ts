export declare class OrderCreatedEvent {
    id: number;
    userId: number;
    items: {
        productId: number;
        quantity: number;
        price: number;
        totalPrice: number;
    }[];
    totalPrice: number;
}
