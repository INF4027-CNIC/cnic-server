"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var UserEntity = /** @class */ (function () {
    function UserEntity(userData) {
        this.init(userData);
    }
    UserEntity.prototype.init = function (userData) {
        this.id = userData.id;
        this.firstname = userData.name.first;
        this.lastname = userData.name.last;
        this.phone = userData.phone;
        this.avatar = userData.avatar;
        this.code = userData.code;
        this.birthDate = userData.birth.date;
        this.birthPlace = userData.birth.place;
        this.size = userData.size;
        this.gender = userData.gender;
        this.profession = userData.profession;
        this.address = userData.address;
        this.fathername = userData.fathername;
        this.mothername = userData.mothername;
        this.fullname = userData.fullname;
        this.createdAt = userData.metadata.createdAt;
        this.updatedAt = userData.metadata.updatedAt;
        this.hash = userData.hash;
        this.hashRt = userData.hashRt;
    };
    Object.defineProperty(UserEntity.prototype, "getDatas", {
        get: function () {
            return {
                id: this.id,
                firstname: this.firstname,
                lastname: this.lastname,
                fullname: this.fullname,
                phone: this.phone,
                avatar: this.avatar,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                hash: this.hash,
                hashRt: this.hashRt
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getFistname", {
        get: function () {
            return this.firstname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getLastname", {
        get: function () {
            return this.lastname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getPhone", {
        get: function () {
            return this.phone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getAvatar", {
        get: function () {
            return this.avatar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getCode", {
        get: function () {
            return this.code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getBirthDate", {
        get: function () {
            return this.birthDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getBirthPlace", {
        get: function () {
            return this.birthPlace;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getSize", {
        get: function () {
            return this.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getGender", {
        get: function () {
            return this.gender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getProfession", {
        get: function () {
            return this.profession;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getAdress", {
        get: function () {
            return this.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getFathername", {
        get: function () {
            return this.fathername;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getMothername", {
        get: function () {
            return this.mothername;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getCreatedAt", {
        get: function () {
            return this.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getUpdatedAt", {
        get: function () {
            return this.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getHash", {
        get: function () {
            return this.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getHashRt", {
        get: function () {
            return this.hashRt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "getBearerRt", {
        get: function () {
            return this.bearerRefreshToken;
        },
        enumerable: false,
        configurable: true
    });
    UserEntity.prototype.setBearerRefreshToken = function (bearerToken) {
        this.bearerRefreshToken = bearerToken;
    };
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "firstname");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "lastname");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "fullname");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "phone");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "avatar");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "code");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "birthDate");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "birthPlace");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "size");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "gender");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "profession");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "address");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "fathername");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "mothername");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "createdAt");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], UserEntity.prototype, "updatedAt");
    __decorate([
        (0, class_transformer_1.Exclude)({ toPlainOnly: true })
    ], UserEntity.prototype, "hash");
    __decorate([
        (0, class_transformer_1.Exclude)({ toPlainOnly: true })
    ], UserEntity.prototype, "hashRt");
    __decorate([
        (0, class_transformer_1.Exclude)({ toPlainOnly: true })
    ], UserEntity.prototype, "bearerRefreshToken");
    return UserEntity;
}());
exports.UserEntity = UserEntity;
