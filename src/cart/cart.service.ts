import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async addToCart(dto: AddToCartDto) {
    const cart = await this.cartModel.findOne({ userId: dto.userId });

    if (!cart) {
      // Yeni sepet oluştur
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
    const cart = await this.cartModel.findOne({ userId });

    // const cartResponse: CartResponseDTO = { ...cart };
    // cart?.items.forEach(item => {
    //   const product = ProductsService.findOne({ id: item.productId});

    // })
    // return cartResponse;
    return cart;
  }

  async clearCart(userId: number) {
    return this.cartModel.deleteOne({ userId });
  }

  async removeItemFromCart(userId: number, productId: number) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException('Sepet bulunamadı');
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId !== productId,
    );

    if (updatedItems.length === cart.items.length) {
      throw new NotFoundException('Sepette böyle bir ürün yok');
    }

    cart.items = updatedItems;
    return cart.save();
  }
}
