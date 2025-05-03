import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CartDocument = Cart & Document;

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

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
