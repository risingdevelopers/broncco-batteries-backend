import { Test, TestingModule } from '@nestjs/testing';
import { ChooseBatteriesController } from './choose-batteries.controller';

describe('ChooseBatteriesController', () => {
  let controller: ChooseBatteriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChooseBatteriesController],
    }).compile();

    controller = module.get<ChooseBatteriesController>(ChooseBatteriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
