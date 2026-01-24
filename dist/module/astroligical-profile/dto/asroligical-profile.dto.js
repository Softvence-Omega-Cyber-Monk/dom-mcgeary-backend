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
exports.UpdateAstrologicalProfileDto = exports.CreateAstrologicalProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAstrologicalProfileDto {
    birth_date;
    birth_time;
    birth_location;
    western_sign;
    chinese_sign;
    result;
    roadmap_overview;
    userId;
}
exports.CreateAstrologicalProfileDto = CreateAstrologicalProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        example: '1990-10-15',
        description: 'Birth date (snake_case)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "birth_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        example: '07:30',
        description: 'Birth time (snake_case)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "birth_time", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'New York, USA',
        description: 'Birth location (snake_case)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "birth_location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'Scorpio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "western_sign", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'Snake' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "chinese_sign", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'snake_case alias for roadmap_overview' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAstrologicalProfileDto.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'snake_case alias for roadmap_overview' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAstrologicalProfileDto.prototype, "roadmap_overview", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAstrologicalProfileDto.prototype, "userId", void 0);
const class_transformer_1 = require("class-transformer");
class UpdateAstrologicalProfileDto {
    birth_date;
    birth_time;
    birth_location;
    western_sign;
    chinese_sign;
    result;
    roadmap_overview;
}
exports.UpdateAstrologicalProfileDto = UpdateAstrologicalProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s birth date in YYYY-MM-DD format',
        example: '1990-05-15',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAstrologicalProfileDto.prototype, "birth_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s birth time in HH:mm format (24-hour)',
        example: '14:30',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAstrologicalProfileDto.prototype, "birth_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User\'s birth location (city, country)',
        example: 'New York, USA',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAstrologicalProfileDto.prototype, "birth_location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Western zodiac sign (e.g., Taurus, Leo)',
        example: 'Taurus',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAstrologicalProfileDto.prototype, "western_sign", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Chinese zodiac sign (e.g., Dragon, Rabbit)',
        example: 'Dragon',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAstrologicalProfileDto.prototype, "chinese_sign", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed astrological calculation result object',
        type: Object,
        required: false,
        example: {
            sun_sign: 'Taurus',
            moon_sign: 'Cancer',
            rising_sign: 'Virgo',
            elements: { fire: 2, earth: 3, air: 1, water: 2 },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Object)
], UpdateAstrologicalProfileDto.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Roadmap overview containing personalized insights',
        type: Object,
        required: false,
        example: {
            career: 'Strong potential in creative fields...',
            relationships: 'Harmonious connections expected...',
            health: 'Focus on stress management...',
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Object)
], UpdateAstrologicalProfileDto.prototype, "roadmap_overview", void 0);
//# sourceMappingURL=asroligical-profile.dto.js.map