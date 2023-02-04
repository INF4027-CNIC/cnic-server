"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var class_validator_1 = require("class-validator");
var validators_1 = require("../../common/validators");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "firstname");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "lastname");
    __decorate([
        (0, validators_1.IsPhoneNumber)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "phone");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "avatar");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "birthDate");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "birthPlace");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(4)
    ], CreateUserDto.prototype, "size");
    __decorate([
        (0, class_validator_1.IsIn)(['male', 'female']),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "gender");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(30)
    ], CreateUserDto.prototype, "profession");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(30)
    ], CreateUserDto.prototype, "address");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "fathername");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDto.prototype, "mothername");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
