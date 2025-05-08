import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserVisit, UserVisitDocument } from './schemas/user-visit.schema';

@Injectable()
export class UserVisitService {
  constructor(
    @InjectModel(UserVisit.name)
    private readonly userVisitModel: Model<UserVisitDocument>,
  ) {}

  async recordVisit(userId: number, productId: number): Promise<void> {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const recentVisit = await this.userVisitModel.findOne({
      userId,
      productId,
      visitedAt: { $gte: tenMinutesAgo },
    });

    if (recentVisit) return;

    await this.userVisitModel.create({ userId, productId });

    const count = await this.userVisitModel.countDocuments({ userId });

    if (count > 100) {
      const oldest = await this.userVisitModel
        .find({ userId })
        .sort({ visitedAt: 1 })
        .limit(count - 100);

      const ids = oldest.map((doc) => doc._id);
      await this.userVisitModel.deleteMany({ _id: { $in: ids } });
    }
  }

  async getUserVisits(userId: number) {
    const visits = await this.userVisitModel
      .find({ userId })
      .sort({ visitedAt: -1 });

    return visits;
  }
}
