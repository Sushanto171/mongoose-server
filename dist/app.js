"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("./app/controllers/users.controllers");
const note_controllers_1 = require("./app/controllers/note.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Server is running..." });
});
app.use('/users', users_controllers_1.userRoutes);
app.use('/notes', note_controllers_1.noteRoutes);
exports.default = app;
