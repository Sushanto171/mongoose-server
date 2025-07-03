import  express, { Request, Response }  from 'express';
import { Note } from '../models/notes.model';
export const noteRoutes = express.Router()

noteRoutes.get("/", async(req:Request,res: Response)=>{
  const notes = await Note.find()
  res.status(200).json({
    message: "Successfully fetched all notes",
    notes
  })
})

noteRoutes.post("/create-note", async(req:Request,res: Response)=>{
  try{

    const body = req.body;
    const note = await Note.create(body)
    res.status(201).json({
      message: "Successfully created a note!",
      note
    })
  }catch(err){
    throw err;
  }
})

noteRoutes.patch("/update-note/:id", async(req:Request,res: Response)=>{
  const noteId = req.params.id;
  const body = req.body
  const note = await Note.findByIdAndUpdate(noteId, body, {new:true})
  res.status(200).json({
    message: "Successfully updated",
    note
  })
})

noteRoutes.delete("/delete-note/:id", async(req:Request,res: Response)=>{
  const noteId = req.params.id;
  const note = await Note.findByIdAndDelete(noteId)
  res.status(200).json({
    message: "Successfully deleted an note",
    note
  })
})

noteRoutes.get("/:id", async(req:Request,res: Response)=>{
  const noteId = req.params.id;
  const note = await Note.findById(noteId)
  res.status(200).json({
    message: "Successfully fetched a note",
    note
  })
})