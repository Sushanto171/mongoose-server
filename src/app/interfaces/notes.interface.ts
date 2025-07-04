import { Types } from "mongoose";

export interface INote {
  title: string;
  body: string;
  comments?: string[];
  pin: boolean;
  category: ("Frontend" | "Backend" | "Fullstack" | "Others")[];
  user: Types.ObjectId;
}


export interface NoteMethod {
  showTitle(title:string): void
}