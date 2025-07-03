import { model, Schema } from "mongoose";
import { INote } from "../interfaces/notes.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: [true, 'Title must be required'], trim: true,  },
    body: { type: String, required: true, trim: true },
    pin: { type: Boolean, default: false },
    comments: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model<INote>('Note', noteSchema)
