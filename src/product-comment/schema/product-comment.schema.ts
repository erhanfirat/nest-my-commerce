import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductCommentDocument = ProductComment & Document;

@Schema({ timestamps: true })
export class ProductComment {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ProductCommentSchema =
  SchemaFactory.createForClass(ProductComment);
