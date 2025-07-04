import mongoose from "mongoose";
import z from "zod";

export const createNoteZodSchema = z.object({
  title: z.string(),
  body:z.string(),
  pin: z.boolean().default(false).optional(),
  comments: z.array(z.string()).optional(),
  user: z.string().refine(value=>{
    return mongoose.Types.ObjectId.isValid(value)
  }),
  category: z.enum(['Frontend', "Backend", "Fullstack", "Others"]).optional()
})

export type CreateNoteType = z.infer<typeof createNoteZodSchema>