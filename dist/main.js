"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const prisma_service_1 = require("./module/prisma/prisma.service");
const jwt_guard_1 = require("./common/guards/jwt.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const swagger_setup_1 = require("./swagger/swagger.setup");
const common_1 = require("@nestjs/common");
const express = __importStar(require("express"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        bodyParser: true,
    });
    app.use('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }));
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