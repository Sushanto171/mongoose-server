"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title must be required"],
        trim: true,
    },
    body: { type: String, required: true, trim: true },
    pin: { type: Boolean, default: false },
    comments: [{ type: String }],
    category: {
        type: [
            { type: String, enum: ["Frontend", "Backend", "Fullstack", "Others"] },
        ],
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
}, {
    versionKey: false,
    timestamps: true,
});
noteSchema.methods.showTitle = function (title) {
    console.log({ title });
};
exports.Note = (0, mongoose_1.model)("Note", noteSchema);
