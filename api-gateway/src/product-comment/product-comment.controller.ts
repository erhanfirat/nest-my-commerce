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
import { ProductCommentDto } from './dto/product-comment.dto';
import { RequestWithUser } from 'src/common/types/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponseDto } from '@ecommerce/types';

@Controller('product-comment')
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) {}

  @Get(':productId')
  findAll(@Param('productId', ParseIntPipe) productId: number) {
    return this.productCommentService.findAll(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  add(
    @Body() productCommentDto: ProductCommentDto,
    @Req() req: RequestWithUser,
  ) {
    productCommentDto.userId = (req.user as UserResponseDto).id;
    return this.productCommentService.addComment(productCommentDto);
  }
}
