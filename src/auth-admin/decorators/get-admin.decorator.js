"use strict";
exports.__esModule = true;
exports.GetAdmin = void 0;
var common_1 = require("@nestjs/common");
exports.GetAdmin = (0, common_1.createParamDecorator)(function (property, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var admin = request.user;
    return property ? admin === null || admin === void 0 ? void 0 : admin[property] : admin;
});
