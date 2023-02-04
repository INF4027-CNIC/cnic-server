"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IsMongodbObjectIdPipe = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var IsMongodbObjectIdPipe = /** @class */ (function () {
    function IsMongodbObjectIdPipe() {
    }
    IsMongodbObjectIdPipe.prototype.transform = function (id) {
        if (!mongoose_1["default"].Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException('Incorrect id provided.');
        return id;
    };
    IsMongodbObjectIdPipe = __decorate([
        (0, common_1.Injectable)()
    ], IsMongodbObjectIdPipe);
    return IsMongodbObjectIdPipe;
}());
exports.IsMongodbObjectIdPipe = IsMongodbObjectIdPipe;
