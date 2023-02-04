"use strict";
exports.__esModule = true;
exports.AdminSchema = void 0;
var mongoose_1 = require("mongoose");
var enums_1 = require("../../common/enums");
var users_costants_1 = require("../../users/users.costants");
exports.AdminSchema = new mongoose_1["default"].Schema({
    adminCode: {
        type: Number,
        "default": function () { return Date.now() + Math.floor(Math.random() * 100); },
        unique: true,
        immutable: true
    },
    userRef: {
        type: mongoose_1.SchemaTypes.ObjectId,
        unique: true,
        ref: users_costants_1.USER
    },
    isActive: {
        type: Boolean,
        "default": true,
        index: true
    },
    metadata: {
        nominatedAd: {
            type: Date,
            immutable: true,
            "default": function () { return Date.now(); }
        },
        denominatedAt: {
            type: Date,
            "default": function () { return Date.now(); }
        }
    },
    roles: {
        type: [String],
        "default": [enums_1.Roles.Admin, enums_1.Roles.User]
    },
    hash: {
        type: String,
        "default": ''
    },
    hashRt: {
        type: String,
        "default": ''
    }
});
