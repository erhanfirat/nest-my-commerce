import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductCommentDto } from './dto/product-comment.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Controller('product-comment')
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) {}

  @Get(':productId')
  findAll(@Param('productId', ParseIntPipe) productId: number) {
    return this.productCommentService.findAll(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  add(@Body() productCommentDto: ProductCommentDto, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = req.user as UserResponseDto;
    productCommentDto.userId = user.id;
    return this.productCommentService.addComment(productCommentDto);
  }
}
