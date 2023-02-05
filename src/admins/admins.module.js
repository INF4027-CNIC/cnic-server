"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminsModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var admins_controller_1 = require("./admins.controller");
var admins_service_1 = require("./admins.service");
var admins_constant_1 = require("./admins.constant");
var admin_schema_1 = require("../mongodb/schemas/admin.schema");
var users_module_1 = require("../users/users.module");
var AdminsModule = /** @class */ (function () {
    function AdminsModule() {
    }
    AdminsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: admins_constant_1.ADMIN,
                        schema: admin_schema_1.AdminSchema
                    },
                ]),
            ],
            controllers: [admins_controller_1.AdminsController],
            providers: [admins_service_1.AdminsService],
            exports: [mongoose_1.MongooseModule, admins_service_1.AdminsService]
        })
    ], AdminsModule);
    return AdminsModule;
}());
exports.AdminsModule = AdminsModule;
