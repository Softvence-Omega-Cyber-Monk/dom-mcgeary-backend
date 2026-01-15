"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const public_decorators_1 = require("../decorators/public.decorators");
const prisma_service_1 = require("../../module/prisma/prisma.service");
let JwtGuard = class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    prisma;
    constructor(reflector, prisma) {
        super();
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const canProceed = await super.canActivate(context);
        if (!canProceed)
            return false;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const existingUser = await this.prisma.user.findUnique({
            where: { id: user.id },
        });
        if (!existingUser || existingUser.isDeleted) {
            throw new common_1.ForbiddenException('Your account is not found');
        }
        if (!existingUser.isActive) {
            throw new common_1.ForbiddenException('Your account is not Active yet!');
        }
        return true;
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], JwtGuard);
//# sourceMappingURL=jwt.guard.js.map