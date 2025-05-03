import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';
import { AddToCartDto } from './dto/cart.dto';
import { CartDocument } from './types/types';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async addToCart(dto: AddToCartDto) {
    const cart = await this.cartModel.findOne({ userId: dto.userId });

    if (!cart) {
      return this.cartModel.create({
        userId: dto.userId,
        items: [
          {
            productId: dto.productId,
            name: dto.name,
            price: dto.price,
            quantity: dto.quantity,
          },
        ],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === dto.productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += dto.quantity;
    } else {
      cart.items.push({
        productId: dto.productId,
        name: dto.name,
        price: dto.price,
        quantity: dto.quantity,
      });
    }

    return cart.save();
  }

  async getCart(userId: number) {
    return this.cartModel.findOne({ userId });
  }

  async clearCart(userId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.cartModel.deleteOne({ userId });
  }
}
