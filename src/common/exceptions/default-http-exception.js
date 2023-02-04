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
exports.__esModule = true;
exports.DefaultHttpException = void 0;
var common_1 = require("@nestjs/common");
var DefaultHttpException = /** @class */ (function (_super) {
    __extends(DefaultHttpException, _super);
    function DefaultHttpException() {
        return _super.call(this, 'And error occured.', common_1.HttpStatus.INTERNAL_SERVER_ERROR) || this;
    }
    return DefaultHttpException;
}(common_1.HttpException));
exports.DefaultHttpException = DefaultHttpException;
