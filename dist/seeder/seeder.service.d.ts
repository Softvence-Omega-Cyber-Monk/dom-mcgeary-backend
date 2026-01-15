import { OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';
export declare class SeederService implements OnApplicationBootstrap {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    onApplicationBootstrap(): Promise<void>;
    private seedAdmin;
}
