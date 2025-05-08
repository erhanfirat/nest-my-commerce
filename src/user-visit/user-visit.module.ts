import { Module } from '@nestjs/common';
import { UserVisitService } from './user-visit.service';
import { UserVisitController } from './user-visit.controller';

@Module({
  providers: [UserVisitService],
  controllers: [UserVisitController]
})
export class UserVisitModule {}
