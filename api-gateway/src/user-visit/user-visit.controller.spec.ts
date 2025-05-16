import { Test, TestingModule } from '@nestjs/testing';
import { UserVisitController } from './user-visit.controller';

describe('UserVisitController', () => {
  let controller: UserVisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVisitController],
    }).compile();

    controller = module.get<UserVisitController>(UserVisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
