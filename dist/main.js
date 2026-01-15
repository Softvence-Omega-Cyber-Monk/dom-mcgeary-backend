"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const prisma_service_1 = require("./module/prisma/prisma.service");
const jwt_guard_1 = require("./common/guards/jwt.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const swagger_setup_1 = require("./swagger/swagger.setup");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        bodyParser: true,
    });
    app.enableCors({
        origin: ["http://localhost:5173", "http://localhost:5174", "https://dom-mcgeary-frontend.vercel.app"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const reflector = app.get(core_1.Reflector);
    const prisma = app.get(prisma_service_1.PrismaService);
    app.useGlobalGuards(new jwt_guard_1.JwtGuard(reflector, prisma), new roles_guard_1.RolesGuard(reflector));
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        skipUndefinedProperties: true,
    }));
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    (0, swagger_setup_1.setupSwagger)(app);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map