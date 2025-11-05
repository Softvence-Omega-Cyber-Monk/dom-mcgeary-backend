import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { PrismaService } from './prisma/prisma.service';
import { JwtGuard } from './common/guards/jwt.guard';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  
  const reflector = app.get(Reflector);
  const prisma = app.get(PrismaService);

  app.useGlobalGuards(
    new JwtGuard(reflector, prisma),
    // new RolesGuard(reflector),
  );

  app.setGlobalPrefix("api/v1")
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT as string);
}
bootstrap();
