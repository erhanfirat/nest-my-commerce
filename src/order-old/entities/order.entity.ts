export class Order {
  id: number;
  userId: number;
  products: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
