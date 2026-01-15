import { PartnerService } from './partner.service';
import { PartnerInfoCreateDto, PartnerInfoUpdateDto } from './dto/partnerifno.dto';
import type { Request, Response } from 'express';
export declare class PartnerController {
    private partnerService;
    constructor(partnerService: PartnerService);
    updatePartner(dto: PartnerInfoUpdateDto | PartnerInfoCreateDto, req: Request, res: Response): Promise<void>;
}
