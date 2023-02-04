"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TimeoutInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var TimeoutInterceptor = /** @class */ (function () {
    function TimeoutInterceptor() {
    }
    TimeoutInterceptor.prototype.intercept = function (context, next) {
        return next.handle().pipe((0, rxjs_1.timeout)(8000), (0, rxjs_1.catchError)(function (err) {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(function () { return new common_1.RequestTimeoutException('Timeout exceeded'); });
            }
            return (0, rxjs_1.throwError)(function () { return err; });
        }));
    };
    TimeoutInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], TimeoutInterceptor);
    return TimeoutInterceptor;
}());
exports.TimeoutInterceptor = TimeoutInterceptor;
