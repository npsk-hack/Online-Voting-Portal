import { Test, TestingModule } from '@nestjs/testing';
import { ConstituenciesController } from './constituencies.controller';

describe('Constituencies Controller', () => {
  let controller: ConstituenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstituenciesController],
    }).compile();

    controller = module.get<ConstituenciesController>(ConstituenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
