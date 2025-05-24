export class OrderCreatedEvent {
  id: number;
  userId: number;
  items: { productId: number; quantity: number }[];
  totalPrice: number;
}
