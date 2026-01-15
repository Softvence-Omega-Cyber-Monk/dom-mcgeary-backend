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
exports.PartnerInfoUpdateDto = exports.PartnerInfoCreateDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class PartnerInfoCreateDto {
    name;
    birthDate;
    birthTime;
    birthLocation;
    relationType;
}
exports.PartnerInfoCreateDto = PartnerInfoCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the partner',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartnerInfoCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birthdate of the partner',
        example: '1990-01-01',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartnerInfoCreateDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birth time of the partner',
        example: '08:00',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartnerInfoCreateDto.prototype, "birthTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birth location of the partner',
        example: 'New York',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartnerInfoCreateDto.prototype, "birthLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The relationship type with the partner',
        example: 'WIFE',
        enum: client_1.relationType,
    }),
    (0, class_validator_1.IsEnum)(client_1.relationType),
    __metadata("design:type", String)
], PartnerInfoCreateDto.prototype, "relationType", void 0);
class PartnerInfoUpdateDto {
    name;
    birthDate;
    birthTime;
    birthLocation;
    relationType;
}
exports.PartnerInfoUpdateDto = PartnerInfoUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the partner',
        example: 'Jane Doe',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerInfoUpdateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birthdate of the partner',
        example: '1991-05-15',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerInfoUpdateDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birth time of the partner',
        example: '10:30',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerInfoUpdateDto.prototype, "birthTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The birth location of the partner',
        example: 'Los Angeles',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerInfoUpdateDto.prototype, "birthLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The relationship type with the partner',
        example: 'GIRL_FRIEND',
        enum: client_1.relationType,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(client_1.relationType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerInfoUpdateDto.prototype, "relationType", void 0);
//# sourceMappingURL=partnerifno.dto.js.map