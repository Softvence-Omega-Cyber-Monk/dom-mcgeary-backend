import { Module } from '@nestjs/common';
import { AstroligicalProfileController } from './astroligical-profile.controller';
import { AstroligicalProfileService } from './astroligical-profile.service';

@Module({
  controllers: [AstroligicalProfileController],
  providers: [AstroligicalProfileService]
})
export class AstroligicalProfileModule {}
