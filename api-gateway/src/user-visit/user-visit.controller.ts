import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth_old/guards/jwt-auth.guard';
import { UserVisitService } from './user-visit.service';
import { RequestWithUser } from 'src/common/types/types';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AddVisitDto } from './dto/add-user-visit.dto';

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
