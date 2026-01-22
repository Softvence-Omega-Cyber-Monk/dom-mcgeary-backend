"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./module/auth/auth.module");
const prisma_module_1 = require("./module/prisma/prisma.module");
const mail_module_1 = require("./module/mail/mail.module");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const partner_module_1 = require("./module/partner/partner.module");
const seeder_service_1 = require("./seeder/seeder.service");
const astroligical_profile_module_1 = require("./module/astroligical-profile/astroligical-profile.module");
const stripe_module_1 = require("./module/stripe/stripe.module");
const stripe_controller_1 = require("./module/stripe/stripe.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    transport: {
                        host: config.get('SMTP_HOST'),
                        port: Number(config.get('SMTP_PORT') || 587),
                        secure: Number(config.get('SMTP_PORT') || 587) === 465,
                        auth: {
                            user: config.get('SMTP_USER'),
                            pass: config.get('SMTP_PASS'),
                        },
                    },
                    defaults: {
                        from: config.get('SMTP_FROM') || config.get('SMTP_USER'),
                    },
                }),
            }), auth_module_1.AuthModule, prisma_module_1.PrismaModule, mail_module_1.MailModule, partner_module_1.PartnerModule, astroligical_profile_module_1.AstroligicalProfileModule, stripe_module_1.StripeModule],
        controllers: [app_controller_1.AppController, stripe_controller_1.StripeController],
        providers: [app_service_1.AppService, seeder_service_1.SeederService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map