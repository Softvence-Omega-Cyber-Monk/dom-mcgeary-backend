"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Romain API Documentation')
    .setDescription('Comprehensive API documentation for the application services')
    .setVersion('1.0')
    .addCookieAuth('refreshToken')
    .addTag('API')
    .addApiKey({
    type: 'apiKey',
    name: 'authorization',
    in: 'header',
}, 'auth')
    .addSecurityRequirements({
    auth: [],
})
    .build();
//# sourceMappingURL=swagger.config.js.map