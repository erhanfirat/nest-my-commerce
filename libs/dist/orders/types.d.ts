export type OrderType = {
    id: number;
    totalPrice: number;
    userId: number;
    items: OrderItem[];
};
export type OrderItem = {
    productId: number;
    orderId: number;
    quantity: number;
    price: number;
    totalPrice: number;
};
export declare const ORDER_PATTERNS: {
    FIND_ALL: string;
    FIND_ONE: string;
    FIND_BY_EMAIL: string;
    CREATE: string;
    UPDATE: string;
    REMOVE: string;
};
export declare const ORDER_KAFKA_EVENTS: {
    ORDER_CREATED: string;
};
