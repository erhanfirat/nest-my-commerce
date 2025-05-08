import { Test, TestingModule } from '@nestjs/testing';
import { UserVisitService } from './user-visit.service';

describe('UserVisitService', () => {
  let service: UserVisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVisitService],
    }).compile();

    service = module.get<UserVisitService>(UserVisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
