"use strict";
exports.__esModule = true;
exports.PublicRoute = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("../constants");
var PublicRoute = function () { return (0, common_1.SetMetadata)(constants_1.IS_PUBLIC_ROUTE, true); };
exports.PublicRoute = PublicRoute;
