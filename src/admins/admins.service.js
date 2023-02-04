"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AdminsService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var exceptions_1 = require("../common/exceptions");
var helpers_1 = require("../common/helpers");
var enum_1 = require("../mongodb/enum");
var user_not_fount_1 = require("../users/exceptions/user-not-fount");
var admins_constant_1 = require("./admins.constant");
var admin_entity_1 = require("./entities/admin.entity");
var exceptions_2 = require("./exceptions");
var AdminsService = /** @class */ (function () {
    function AdminsService(adminModel, userService) {
        this.adminModel = adminModel;
        this.userService = userService;
    }
    AdminsService.prototype.create = function (createAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userRefId, user, adminPassword, hash, newAdmin, admin, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userRefId = createAdminDto.userRef;
                        if (!mongoose_2["default"].Types.ObjectId.isValid(userRefId))
                            throw new common_1.BadRequestException("To create and admin account, you must provide he's correct user id");
                        return [4 /*yield*/, this.userService.findById(userRefId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new user_not_fount_1.UserNotFoundException();
                        adminPassword = (0, helpers_1.generateUUID)();
                        return [4 /*yield*/, (0, helpers_1.hashPassword)(adminPassword)];
                    case 2:
                        hash = _a.sent();
                        newAdmin = new this.adminModel(__assign(__assign({}, createAdminDto), { hash: hash }));
                        return [4 /*yield*/, newAdmin.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.adminModel
                                .findById(newAdmin.id)
                                .populate('userRef', 'id name code phone')];
                    case 4:
                        admin = _a.sent();
                        return [2 /*return*/, new admin_entity_1.AdminEntity(admin, adminPassword)];
                    case 5:
                        err_1 = _a.sent();
                        if (err_1.code === enum_1.exceptionsCodes.duplicatePropertyValue)
                            throw new common_1.BadRequestException('Some given credentials are already taken by another admin, try agin');
                        throw new exceptions_1.DefaultHttpException();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminsService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allAdmins, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminModel
                                .find()
                                .populate('userRef', 'id name code phone')];
                    case 1:
                        allAdmins = _a.sent();
                        return [2 /*return*/, allAdmins.map(function (admin) { return new admin_entity_1.AdminEntity(admin); })];
                    case 2:
                        err_2 = _a.sent();
                        throw new exceptions_1.DefaultHttpException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminsService.prototype.findOneById = function (adminId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundAdmin, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminModel
                                .findById(adminId)
                                .where({ isActive: true })
                                .populate('userRef', 'id name code phone')];
                    case 1:
                        foundAdmin = _a.sent();
                        if (!foundAdmin)
                            throw new exceptions_2.AdminNotFoundException();
                        return [2 /*return*/, new admin_entity_1.AdminEntity(foundAdmin)];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminsService.prototype.findByAdminCode = function (adminCode) {
        return __awaiter(this, void 0, void 0, function () {
            var foundAdmin, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminModel
                                .findOne({
                                adminCode: adminCode,
                                isActive: true
                            })
                                .populate('userRef', 'id name code phone')];
                    case 1:
                        foundAdmin = _a.sent();
                        if (!foundAdmin)
                            throw new exceptions_2.AdminNotFoundException();
                        return [2 /*return*/, new admin_entity_1.AdminEntity(foundAdmin)];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminsService.prototype.adminExists = function (adminCode) {
        return __awaiter(this, void 0, void 0, function () {
            var admin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminModel.findOne({ adminCode: adminCode })];
                    case 1:
                        admin = _a.sent();
                        return [2 /*return*/, !!admin];
                }
            });
        });
    };
    AdminsService.prototype.findByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var admins;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminModel
                            .find({
                            firstname: { $regex: new RegExp(name), $options: 'i' },
                            lastname: { $regex: new RegExp(name), $options: 'i' }
                        })
                            .populate('userRef')];
                    case 1:
                        admins = _a.sent();
                        return [2 /*return*/, admins.map(function (admin) { return new admin_entity_1.AdminEntity(admin); })];
                }
            });
        });
    };
    AdminsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(admins_constant_1.ADMIN))
    ], AdminsService);
    return AdminsService;
}());
exports.AdminsService = AdminsService;
