"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("./enum");
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: [enum_1.Role.STUDENT, enum_1.Role.ADMIN],
        default: enum_1.Role.STUDENT,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profilePicture: { type: String, default: "" },
    isVerified: { type: Boolean, required: true, default: false },
    verificationToken: { type: String },
});
//# sourceMappingURL=users.schema.js.map