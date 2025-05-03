import { Cart } from '../schema/cart.schema';

export type CartDocument = Cart & Document;

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};
