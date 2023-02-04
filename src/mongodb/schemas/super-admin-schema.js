"use strict";
exports.__esModule = true;
exports.SuperAdminSchema = void 0;
var mongoose_1 = require("mongoose");
exports.SuperAdminSchema = new mongoose_1["default"].Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hash: {
        type: String,
        required: true,
        trim: true
    }
});
