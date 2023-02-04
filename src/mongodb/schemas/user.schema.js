"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var enums_1 = require("../../common/enums");
exports.UserSchema = new mongoose_1["default"].Schema({
    name: {
        first: {
            type: String,
            maxLength: 30,
            index: true,
            require: true,
            trim: true,
            lowercase: true
        },
        last: {
            type: String,
            maxLength: 30,
            index: true,
            require: true,
            trim: true,
            lowercase: true
        }
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true
    },
    birth: {
        date: {
            type: Number,
            require: true
        },
        place: {
            type: String,
            require: true,
            trim: true
        }
    },
    size: {
        type: Number,
        min: 0,
        max: 4
    },
    gender: String,
    profession: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        "default": function () { return Date.now() + Math.floor(Math.random() * 100); },
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        require: true
    },
    mothername: {
        type: String,
        required: true
    },
    metadata: {
        createdAt: {
            type: Date,
            "default": function () { return Date.now(); },
            immutable: true
        },
        updatedAt: {
            type: Date,
            "default": function () { return Date.now(); }
        }
    },
    roles: {
        type: [String],
        "default": [enums_1.Roles.User]
    },
    hash: String,
    hashRt: String
});
exports.UserSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});
exports.UserSchema.pre('save', function (next) {
    this.metadata.updatedAt = new Date(Date.now());
    next();
});
