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
exports.getTokens = getTokens;
exports.generateOtpCode = generateOtpCode;
exports.hashOtpCode = hashOtpCode;
exports.verifyOtp = verifyOtp;
const bcrypt = __importStar(require("bcrypt"));
const common_1 = require("@nestjs/common");
async function getTokens(jwtService, userId, email, role) {
    const [access_token, refresh_token] = await Promise.all([
        jwtService.signAsync({ id: userId, email, role }, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIREIN,
        }),
        jwtService.signAsync({ id: userId, email, role }, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXPIREIN,
        }),
    ]);
    return { access_token, refresh_token };
}
function generateOtpCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
async function hashOtpCode(code) {
    return bcrypt.hash(code, parseInt(process.env.SALT_ROUND));
}
async function verifyOtp(prisma, email, code) {
    const otpRecord = await prisma.otpCode.findFirst({
        where: { email, verified: false },
        orderBy: { createdAt: 'desc' },
    });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
        throw new common_1.BadRequestException('Invalid or expired code');
    }
    const isValid = await bcrypt.compare(code, otpRecord.code);
    if (!isValid) {
        throw new common_1.BadRequestException('Incorrect code');
    }
    await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { verified: true },
    });
    return { message: 'OTP verified successfully' };
}
//# sourceMappingURL=auth.utils.js.map