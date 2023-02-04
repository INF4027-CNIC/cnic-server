"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminEntity = void 0;
var class_transformer_1 = require("class-transformer");
var AdminEntity = /** @class */ (function () {
    function AdminEntity(adminData, password) {
        this.init(adminData, password);
    }
    AdminEntity.prototype.init = function (adminData, password) {
        this.id = adminData.id;
        this.userRef = adminData.userRef;
        this.isActive = adminData.isActive;
        this.password = password && password;
        this.adminCode = adminData.adminCode;
        this.hash = adminData.hash;
        this.hashRt = adminData.hashRt;
    };
    Object.defineProperty(AdminEntity.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getUserRef", {
        get: function () {
            return this.userRef;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getIsActive", {
        get: function () {
            return this.isActive;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getPassword", {
        get: function () {
            return this.password;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getAdminCode", {
        get: function () {
            return this.adminCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getHash", {
        get: function () {
            return this.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getHashRt", {
        get: function () {
            return this.hashRt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminEntity.prototype, "getBearerRt", {
        get: function () {
            return this.bearerRt;
        },
        enumerable: false,
        configurable: true
    });
    AdminEntity.prototype.setBearerRt = function (bearerRt) {
        this.bearerRt = bearerRt;
    };
    __decorate([
        (0, class_transformer_1.Exclude)()
    ], AdminEntity.prototype, "hash");
    return AdminEntity;
}());
exports.AdminEntity = AdminEntity;
