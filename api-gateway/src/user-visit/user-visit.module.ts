import { Module } from '@nestjs/common';
import { UserVisitService } from './user-visit.service';
import { UserVisitController } from './user-visit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserVisit, UserVisitSchema } from './schemas/user-visit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVisit.name, schema: UserVisitSchema },
    ]),
  ],
  providers: [UserVisitService],
  controllers: [UserVisitController],
  exports: [UserVisitService],
})
export class UserVisitModule {}
