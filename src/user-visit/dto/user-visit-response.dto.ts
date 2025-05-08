import { Type } from 'class-transformer';

export class UserVisitResponseDto {
  @Type(() => Number)
  userId: number;

  @Type(() => Number)
  productId: number;

  visitedAt: Date;

  constructor(partial: Partial<UserVisitResponseDto>) {
    Object.assign(this, partial);
  }
}
