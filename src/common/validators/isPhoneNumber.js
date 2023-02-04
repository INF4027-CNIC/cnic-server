"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IsPhoneNumber = exports.PhoneNumberConstraint = void 0;
var class_validator_1 = require("class-validator");
var PhoneNumberConstraint = /** @class */ (function () {
    function PhoneNumberConstraint() {
    }
    PhoneNumberConstraint.prototype.validate = function (phoneNumber, args) {
        // regular expression to match phone number with the format 677109790
        var phoneRegex = /^6[^0-4]\d{7}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return false;
        }
        return true;
    };
    PhoneNumberConstraint.prototype.defaultMessage = function (args) {
        var property = args.property;
        return "property ".concat(property, " should be a 9 digits number starting with 6 and the second digit should not be 0, 1, 2, 3, or 4.");
    };
    PhoneNumberConstraint = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ async: false })
    ], PhoneNumberConstraint);
    return PhoneNumberConstraint;
}());
exports.PhoneNumberConstraint = PhoneNumberConstraint;
function IsPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: PhoneNumberConstraint
        });
    };
}
exports.IsPhoneNumber = IsPhoneNumber;
