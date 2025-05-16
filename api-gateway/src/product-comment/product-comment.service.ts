import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductComment,
  ProductCommentDocument,
} from './schema/product-comment.schema';
import { Model } from 'mongoose';
import { ProductCommentDto } from './dto/product-comment.dto';

@Injectable()
export class ProductCommentService {
  constructor(
    @InjectModel(ProductComment.name)
    private productCommentModel: Model<ProductCommentDocument>,
  ) {}

  async findAll(productId: number) {
    return await this.productCommentModel.find({ productId });
  }

  async addComment(productCommentDto: ProductCommentDto) {
    const productComment = await this.productCommentModel.findOne({
      productId: productCommentDto.productId,
      userId: productCommentDto.userId,
    });

    if (productComment) {
      productComment.comment = productCommentDto.comment;
      productComment.rating = productCommentDto.rating;
      return productComment.save();
    }

    return this.productCommentModel.create({
      ...productCommentDto,
    });
  }
}
