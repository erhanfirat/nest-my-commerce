import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId')
  clearCart(@Param('userId') userId: number) {
    return this.cartService.clearCart(userId);
  }
}
