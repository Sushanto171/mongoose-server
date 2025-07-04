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
exports.noteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const note_zod_interface_1 = require("../interfaces/note.zod.interface");
const notes_model_1 = require("../models/notes.model");
exports.noteRoutes = express_1.default.Router();
exports.noteRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_model_1.Note.find().populate("user");
    res.status(200).json({
        message: "Successfully fetched all notes",
        notes,
    });
}));
exports.noteRoutes.post("/create-note", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield note_zod_interface_1.createNoteZodSchema.parseAsync(req.body);
        // const note = await Note.create(body);
        const note = new notes_model_1.Note(body);
        note.showTitle(body.title);
        res.status(201).json({
            message: "Successfully created a note!",
            note,
        });
    }
    catch (err) {
        throw err;
    }
}));
exports.noteRoutes.patch("/update-note/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const body = req.body;
    const note = yield notes_model_1.Note.findByIdAndUpdate(noteId, body, { new: true });
    res.status(200).json({
        message: "Successfully updated",
        note,
    });
}));
exports.noteRoutes.delete("/delete-note/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const note = yield notes_model_1.Note.findByIdAndDelete(noteId);
    res.status(200).json({
        message: "Successfully deleted an note",
        note,
    });
}));
exports.noteRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const note = yield notes_model_1.Note.findById(noteId).populate("user");
    res.status(200).json({
        message: "Successfully fetched a note",
        note,
    });
}));
