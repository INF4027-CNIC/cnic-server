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
exports.AuthAdminService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var admins_constant_1 = require("../admins/admins.constant");
var helpers_1 = require("../common/helpers");
var argon = require("argon2");
var AuthAdminService = /** @class */ (function () {
    function AuthAdminService(adminModel, adminService, configService, jwtService) {
        this.adminModel = adminModel;
        this.adminService = adminService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    AuthAdminService.prototype.login = function (logingAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var adminCode, password, admin, isPasswordValid, tokens, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        adminCode = logingAdminDto.adminCode, password = logingAdminDto.password;
                        return [4 /*yield*/, this.adminService.findByAdminCode(adminCode)];
                    case 1:
                        admin = _a.sent();
                        return [4 /*yield*/, (0, helpers_1.isPasswordMatched)(password, admin.getHash)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid)
                            throw new common_1.UnauthorizedException('invalid password');
                        return [4 /*yield*/, this.generateToken(admin.getId, admin.getAdminCode)];
                    case 3:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(admin.getId, tokens.refresh_token)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthAdminService.prototype.logout = function (adminId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateRefreshToken(adminId, '')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthAdminService.prototype.refreshTokens = function (adminId, bearerRt) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, isRtValid, tokens, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.adminService.findOneById(adminId)];
                    case 1:
                        admin = _a.sent();
                        return [4 /*yield*/, argon.verify(admin.getHashRt, bearerRt)];
                    case 2:
                        isRtValid = _a.sent();
                        if (!isRtValid)
                            throw new common_1.ForbiddenException('Acces denied to refresh your token.');
                        return [4 /*yield*/, this.generateToken(admin.getId, admin.getAdminCode)];
                    case 3:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(adminId, tokens.refresh_token)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                    case 5:
                        err_2 = _a.sent();
                        throw err_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthAdminService.prototype.jwtValidateAdmin = function (adminId) {
        return __awaiter(this, void 0, void 0, function () {
            var admin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminService.findOneById(adminId)];
                    case 1:
                        admin = _a.sent();
                        if (!admin || !admin.getHashRt)
                            return [2 /*return*/, null];
                        return [2 /*return*/, admin];
                }
            });
        });
    };
    AuthAdminService.prototype.jwtRefreshValidateAdmin = function (adminId, bearerRt) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, isRtMatched;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminService.findOneById(adminId)];
                    case 1:
                        admin = _a.sent();
                        if (!admin || !admin.getHashRt)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, argon.verify(admin.getHashRt, bearerRt)];
                    case 2:
                        isRtMatched = _a.sent();
                        if (!isRtMatched)
                            return [2 /*return*/, null];
                        return [2 /*return*/, admin];
                }
            });
        });
    };
    AuthAdminService.prototype.generateToken = function (adminId, adminCode) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, _a, access_token, refresh_token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        payload = {
                            sub: adminId,
                            adminCode: adminCode
                        };
                        return [4 /*yield*/, Promise.all([
                                this.jwtService.signAsync(payload, {
                                    secret: this.configService.get('JWT_ACCESS_TOKEN'),
                                    expiresIn: '3d'
                                }),
                                this.jwtService.signAsync(payload, {
                                    secret: this.configService.get('JWT_REFRESH_TOKEN'),
                                    expiresIn: '7d'
                                }),
                            ])];
                    case 1:
                        _a = _b.sent(), access_token = _a[0], refresh_token = _a[1];
                        return [2 /*return*/, { access_token: access_token, refresh_token: refresh_token }];
                }
            });
        });
    };
    AuthAdminService.prototype.updateRefreshToken = function (adminId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var hashRt, foundAdmin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hashRt = '';
                        if (!refreshToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, argon.hash(refreshToken)];
                    case 1:
                        hashRt = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.adminModel.findById(adminId)];
                    case 3:
                        foundAdmin = _a.sent();
                        foundAdmin.hashRt = hashRt;
                        return [4 /*yield*/, foundAdmin.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthAdminService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(admins_constant_1.ADMIN))
    ], AuthAdminService);
    return AuthAdminService;
}());
exports.AuthAdminService = AuthAdminService;
