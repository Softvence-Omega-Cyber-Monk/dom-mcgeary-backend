import { Test, TestingModule } from '@nestjs/testing';
import { AstroligicalProfileController } from './astroligical-profile.controller';

describe('AstroligicalProfileController', () => {
  let controller: AstroligicalProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AstroligicalProfileController],
    }).compile();

    controller = module.get<AstroligicalProfileController>(AstroligicalProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
