import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddToCartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dto.userId = (req.user as UserResponseDto).id;
    return this.cartService.addToCart(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = (req.user as UserResponseDto).id;

    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearCart(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = (req.user as UserResponseDto).id;

    return this.cartService.clearCart(userId);
  }
}
