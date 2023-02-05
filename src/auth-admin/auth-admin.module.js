"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthAdminModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var jwt_1 = require("@nestjs/jwt");
var admins_module_1 = require("../admins/admins.module");
var auth_admin_controller_1 = require("./auth-admin.controller");
var auth_admin_service_1 = require("./auth-admin.service");
var guards_1 = require("./guards");
var strategies_1 = require("./strategies");
var AuthAdminModule = /** @class */ (function () {
    function AuthAdminModule() {
    }
    AuthAdminModule = __decorate([
        (0, common_1.Module)({
            imports: [jwt_1.JwtModule.register({}), admins_module_1.AdminsModule],
            controllers: [auth_admin_controller_1.AuthAdminController],
            providers: [
                auth_admin_service_1.AuthAdminService,
                strategies_1.JwtStrategy,
                strategies_1.JwtRefreshStrategy,
                { provide: core_1.APP_GUARD, useClass: guards_1.AdminJwtGuard },
            ]
        })
    ], AuthAdminModule);
    return AuthAdminModule;
}());
exports.AuthAdminModule = AuthAdminModule;
