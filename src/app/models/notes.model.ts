import { Model, model, Schema } from "mongoose";
import { INote, NoteMethod } from "../interfaces/notes.interface";

const noteSchema = new Schema<INote, Model<INote>, NoteMethod>(
  {
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
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


noteSchema.methods.showTitle = function (title: string) {
  console.log({ title });
};
export const Note = model("Note", noteSchema);
