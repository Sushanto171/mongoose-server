"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    gender: zod_1.default.enum(["MALE", "FEMALE", "CUSTOM"]),
    address: zod_1.default.object({
        country: zod_1.default.enum(["Bangladesh", "US", "India", "Others"]),
        city: zod_1.default.enum(["Dhaka", "Shylet", "Rangpur", "Others"]),
    }),
    friends: zod_1.default.array(zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string().email(),
    })).optional(),
    age: zod_1.default.number().max(60).min(18),
    skills: zod_1.default.array(zod_1.default.string()).optional(),
    isActive: zod_1.default.boolean().default(false).optional(),
    phone: zod_1.default.string().regex(/^(\+8801|01)[0-9]{9}$/, "Invalid phone number"),
    role: zod_1.default.enum(["ADMIN", "USER", "SUPER-ADMIN"]).default("USER").optional(),
});
