import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddToCartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { RequestWithUser } from 'src/common/types/types';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(@Body() dto: AddToCartDto, @Req() req: RequestWithUser) {
    dto.userId = (req.user as UserResponseDto).id;
    return this.cartService.addToCart(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Req() req: RequestWithUser) {
    const userId = (req.user as UserResponseDto).id;
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearCart(@Req() req: RequestWithUser) {
    const userId = (req.user as UserResponseDto).id;
    return this.cartService.clearCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('item/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = (req.user as UserResponseDto).id;
    return this.cartService.removeItemFromCart(userId, productId);
  }
}
