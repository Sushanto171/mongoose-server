"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoteZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.createNoteZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
    pin: zod_1.default.boolean().default(false).optional(),
    comments: zod_1.default.array(zod_1.default.string()).optional(),
    user: zod_1.default.string().refine(value => {
        return mongoose_1.default.Types.ObjectId.isValid(value);
    }),
    category: zod_1.default.enum(['Frontend', "Backend", "Fullstack", "Others"]).optional()
});
