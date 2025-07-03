"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
exports.userSchema = new mongoose_2.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Custom"], required: true },
    address: {
        country: {
            type: String,
            enum: ["Bangladesh", "US", "India"],
            default: "Bangladesh",
        },
        city: { type: String, enum: ["Dhaka", "Shylet", "Rangpur"] },
    },
    friends: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
    ],
    age: { type: Number, max: 80, min: 18, required: true },
    skills: [{ type: String, default: "" }],
    isActive: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
