import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserVisitDocument = HydratedDocument<UserVisit>;

@Schema({ timestamps: true })
export class UserVisit {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  productId: number;

  @Prop({ default: Date.now })
  visitedAt: Date;
}

export const UserVisitSchema = SchemaFactory.createForClass(UserVisit);
