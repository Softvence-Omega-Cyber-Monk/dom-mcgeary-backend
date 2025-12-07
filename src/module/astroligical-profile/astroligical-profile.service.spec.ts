import { Test, TestingModule } from '@nestjs/testing';
import { AstroligicalProfileService } from './astroligical-profile.service';

describe('AstroligicalProfileService', () => {
  let service: AstroligicalProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AstroligicalProfileService],
    }).compile();

    service = module.get<AstroligicalProfileService>(AstroligicalProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
