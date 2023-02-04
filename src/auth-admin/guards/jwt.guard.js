"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminJwtGuard = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var constants_1 = require("../../common/constants");
var AdminJwtGuard = /** @class */ (function (_super) {
    __extends(AdminJwtGuard, _super);
    function AdminJwtGuard(reflector) {
        var _this = _super.call(this) || this;
        _this.reflector = reflector;
        return _this;
    }
    AdminJwtGuard.prototype.canActivate = function (context) {
        var isPublicRoute = this.reflector.getAllAndOverride(constants_1.IS_PUBLIC_ROUTE, [context.getHandler(), context.getClass()]);
        if (isPublicRoute)
            return true;
        return _super.prototype.canActivate.call(this, context);
    };
    AdminJwtGuard = __decorate([
        (0, common_1.Injectable)()
    ], AdminJwtGuard);
    return AdminJwtGuard;
}((0, passport_1.AuthGuard)(constants_1.JWT)));
exports.AdminJwtGuard = AdminJwtGuard;
