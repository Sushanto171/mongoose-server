import express, { Request, Response } from "express";
import {
  CreateNoteType,
  createNoteZodSchema,
} from "../interfaces/note.zod.interface";
import { Note } from "../models/notes.model";
export const noteRoutes = express.Router();

noteRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await Note.aggregate([
      {
        $lookup: {
          as: "user",
          from: "users",
          localField: "user",
          foreignField: "_id",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          title: 1,
          body: 1,
          user: {
            name: 1,
            email: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      message: "Successfully fetched all notes",
      notes,
    });
  } catch (error) {
    throw error;
  }
});

noteRoutes.post("/create-note", async (req: Request, res: Response) => {
  try {
    const body: CreateNoteType = await createNoteZodSchema.parseAsync(req.body);
    // const note = await Note.create(body);
    const note = new Note(body);
    // note.showTitle(body.title)
    await note.save();
    res.status(201).json({
      message: "Successfully created a note!",
      note,
    });
  } catch (err) {
    throw err;
  }
});

noteRoutes.patch("/update-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const body = req.body;
  const note = await Note.findByIdAndUpdate(noteId, body, { new: true });
  res.status(200).json({
    message: "Successfully updated",
    note,
  });
});

noteRoutes.delete("/delete-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const note = await Note.findByIdAndDelete(noteId);
  res.status(200).json({
    message: "Successfully deleted an note",
    note,
  });
});

noteRoutes.get("/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId).populate("user");
  res.status(200).json({
    message: "Successfully fetched a note",
    note,
  });
});
