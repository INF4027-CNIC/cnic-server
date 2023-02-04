"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var enum_1 = require("./enum");
var swagger_1 = require("@nestjs/swagger");
var pipes_1 = require("../common/pipes");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.create(createUserDto)];
            });
        });
    };
    UsersController.prototype.searchByName = function (fullname) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.searchByName(fullname)];
            });
        });
    };
    UsersController.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.findAll()];
            });
        });
    };
    UsersController.prototype.findById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.findById(userId)];
            });
        });
    };
    UsersController.prototype.findByCode = function (userCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.findByCode(userCode)];
            });
        });
    };
    UsersController.prototype.updateById = function (userId, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.updateById(userId, updateUserDto)];
            });
        });
    };
    UsersController.prototype.updateUserCodeById = function (userId, userCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.updateUserCodeById(userId, userCode)];
            });
        });
    };
    UsersController.prototype.updateByCode = function (userCode, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.updateByCode(userCode, updateUserDto)];
            });
        });
    };
    UsersController.prototype["delete"] = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.usersService["delete"](userId);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, common_1.Post)(enum_1.UsersRoutes.create),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "create");
    __decorate([
        (0, common_1.Get)(enum_1.UsersRoutes.searchByName),
        __param(0, (0, common_1.Query)('fullname', new common_1.DefaultValuePipe('')))
    ], UsersController.prototype, "searchByName");
    __decorate([
        (0, common_1.Get)(enum_1.UsersRoutes.allUsers)
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)("".concat(enum_1.UsersRoutes.findById, "/:userId")),
        __param(0, (0, common_1.Param)('userId', pipes_1.IsMongodbObjectIdPipe))
    ], UsersController.prototype, "findById");
    __decorate([
        (0, common_1.Get)("".concat(enum_1.UsersRoutes.findByCode, "/:userCode")),
        __param(0, (0, common_1.Param)('userCode'))
    ], UsersController.prototype, "findByCode");
    __decorate([
        (0, common_1.Patch)("".concat(enum_1.UsersRoutes.updateById, "/:userId")),
        __param(0, (0, common_1.Param)('userId', pipes_1.IsMongodbObjectIdPipe)),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "updateById");
    __decorate([
        (0, common_1.Patch)("".concat(enum_1.UsersRoutes.updateCodeById, "/:userId")),
        __param(0, (0, common_1.Param)('userId', pipes_1.IsMongodbObjectIdPipe)),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "updateUserCodeById");
    __decorate([
        (0, common_1.Patch)("".concat(enum_1.UsersRoutes.updateByCode, "/:userCode")),
        __param(0, (0, common_1.Param)('userCode')),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "updateByCode");
    __decorate([
        (0, common_1.Delete)("".concat(enum_1.UsersRoutes["delete"], "/:userId")),
        __param(0, (0, common_1.Param)('userId', pipes_1.IsMongodbObjectIdPipe))
    ], UsersController.prototype, "delete");
    UsersController = __decorate([
        (0, common_1.Controller)(enum_1.UsersRoutes.users),
        (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
        (0, swagger_1.ApiTags)('Users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
