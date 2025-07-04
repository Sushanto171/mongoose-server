"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_zod_interface_1 = require("../interfaces/user.zod.interface");
const users_model_1 = require("../models/users.model");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find();
    res.json(users);
}));
exports.userRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_zod_interface_1.createUserZodSchema.parseAsync(req.body);
        const newUser = new users_model_1.User(user);
        yield newUser.hashPassword(user.password);
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        // next(error)
        // console.log("❌❌❌", error);
        throw error;
    }
}));
exports.userRoutes.patch("/update-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const body = req.body;
    const user = yield users_model_1.User.findByIdAndUpdate(userId, body, { new: true });
    res.json({ message: "User updated successfully!", user });
}));
exports.userRoutes.delete("/delete-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield users_model_1.User.findByIdAndDelete(userId);
    res.json({ message: "Successfully deleted the user.", user });
}));
exports.userRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield users_model_1.User.findById(userId);
    res.json({ message: "User fetched successfully!", user });
}));
