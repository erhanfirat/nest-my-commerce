import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartItem } from '../types/types';

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: number;

  @Prop({
    type: [
      {
        productId: Number,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
