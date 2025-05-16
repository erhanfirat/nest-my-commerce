import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserVisitService } from './user-visit.service';
import { RequestWithUser } from 'src/common/types/types';
import { AddVisitDto } from './dto/add-user-visit.dto';
import { UserResponseDto } from '@ecommerce/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user/visits')
@UseGuards(JwtAuthGuard)
export class UserVisitController {
  constructor(private readonly userVisitService: UserVisitService) {}

  @Get()
  async getVisits(@Req() req: RequestWithUser) {
    const userId = (req.user as UserResponseDto).id;
    return this.userVisitService.getUserVisits(userId);
  }

  @Post()
  async recordVisit(@Body() body: AddVisitDto, @Req() req: RequestWithUser) {
    const userId = (req.user as UserResponseDto).id;
    return this.userVisitService.recordVisit(userId, body.productId);
  }
}
