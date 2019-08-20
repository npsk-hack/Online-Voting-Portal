import { Test, TestingModule } from '@nestjs/testing';
import { ConstituenciesService } from './constituencies.service';

describe('ConstituenciesService', () => {
  let service: ConstituenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstituenciesService],
    }).compile();

    service = module.get<ConstituenciesService>(ConstituenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
