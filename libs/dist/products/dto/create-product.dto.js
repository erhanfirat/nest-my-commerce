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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "İsim alanı metin olmalıdır" }),
    (0, class_validator_1.MinLength)(3, { message: "İsim en az 3 karakter olmalıdır" }),
    (0, class_validator_1.MaxLength)(100, { message: "İsim en fazla 100 karakter olmalıdır" }),
    (0, class_transformer_1.Transform)((params) => {
        if (typeof params.value === "string") {
            return params.value.trim();
        }
        return "";
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Açıklama alanı metin olmalıdır" }),
    (0, class_validator_1.MinLength)(10, { message: "Açıklama en az 10 karakter olmalıdır" }),
    (0, class_transformer_1.Transform)((params) => {
        if (typeof params.value === "string") {
            return params.value.trim();
        }
        return "";
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Fiyat sayı olmalıdır" }),
    (0, class_validator_1.Min)(0, { message: "Fiyat 0 veya daha büyük olmalıdır" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Stok sayı olmalıdır" }),
    (0, class_validator_1.Min)(0, { message: "Stok 0 veya daha büyük olmalıdır" }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: "Geçerli bir URL adresi giriniz" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Kategori alanı metin olmalıdır" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
