import { Test, TestingModule } from '@nestjs/testing';
import { ChooseBatteriesService } from './choose-batteries.service';

describe('ChooseBatteriesService', () => {
  let service: ChooseBatteriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChooseBatteriesService],
    }).compile();

    service = module.get<ChooseBatteriesService>(ChooseBatteriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
