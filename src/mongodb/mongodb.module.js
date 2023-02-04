"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MongodbModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var MongodbModule = /** @class */ (function () {
    function MongodbModule() {
    }
    MongodbModule_1 = MongodbModule;
    MongodbModule.forRoot = function () {
        return {
            module: MongodbModule_1,
            imports: [
                mongoose_1.MongooseModule.forRoot(MongodbModule_1.configService.get('MONGO_URI')),
            ]
        };
    };
    var MongodbModule_1;
    MongodbModule.configService = new config_1.ConfigService();
    MongodbModule = MongodbModule_1 = __decorate([
        (0, common_1.Module)({})
    ], MongodbModule);
    return MongodbModule;
}());
exports.MongodbModule = MongodbModule;
