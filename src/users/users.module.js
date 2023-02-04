"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var mongoose_1 = require("@nestjs/mongoose");
var guards_1 = require("../auth-admin/guards");
var schemas_1 = require("../mongodb/schemas");
var users_controller_1 = require("./users.controller");
var users_costants_1 = require("./users.costants");
var users_service_1 = require("./users.service");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: users_costants_1.USER,
                        schema: schemas_1.UserSchema
                    },
                ]),
            ],
            controllers: [users_controller_1.UsersController],
            providers: [users_service_1.UsersService, { provide: core_1.APP_GUARD, useClass: guards_1.AdminJwtGuard }],
            exports: [users_service_1.UsersService]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
