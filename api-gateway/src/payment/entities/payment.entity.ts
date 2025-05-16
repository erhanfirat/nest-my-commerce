export class Payment {
  id: number;
  orderId: number;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
