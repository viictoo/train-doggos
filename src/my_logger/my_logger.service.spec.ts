import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggerService } from './my_logger.service';

describe('MyLoggerService', () => {
  let service: MyLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLoggerService],
    }).compile();

    service = module.get<MyLoggerService>(MyLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
