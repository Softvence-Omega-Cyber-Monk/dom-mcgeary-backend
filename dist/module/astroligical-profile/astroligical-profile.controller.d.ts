import { CreateAstrologicalProfileDto } from './dto/asroligical-profile.dto';
import type { Request, Response } from 'express';
import { AstroligicalProfileService } from './astroligical-profile.service';
export declare class AstroligicalProfileController {
    private AstroligicalProfileService;
    constructor(AstroligicalProfileService: AstroligicalProfileService);
    createAstroligicalProfile(dto: CreateAstrologicalProfileDto, req: Request, res: Response): Promise<void>;
    getAastrologicanProfile(req: Request, res: Response): Promise<void>;
}
