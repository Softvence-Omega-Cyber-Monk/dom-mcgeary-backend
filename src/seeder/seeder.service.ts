import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { userRole } from '@prisma/client';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(SeederService.name);

  async onApplicationBootstrap() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const superAdminEmail = process.env.ADMIN_EMAIL as string;
    const superAdminPassword = process.env.ADMIN_PASSWORD as string;
    const fullName = process.env.FULL_NAME as string
    const supperAdmin = await this.prisma.user.findFirst({
      where: { role: userRole.ADMIN},
    });

    if ( supperAdmin) {
      this.logger.log('Admin is already exists, skipping seeding.');
      return;
    }

    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    await this.prisma.user.create({
      data: {
        fullName:fullName,
        email: superAdminEmail,
        password: hashedPassword,
        role: userRole.ADMIN,
        isActive:true
      },
    });

    this.logger.log(`Default super admin created: ${superAdminEmail}`);
  }
}
