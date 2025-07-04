import express, { Application, NextFunction, Request, Response } from "express";
import { noteRoutes } from "./app/controllers/note.controllers";
import { userRoutes } from "./app/controllers/users.controllers";
import { ErrorHandler } from "./app/interfaces/error.interface";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running..." });
});

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.use((req:Request, res:Response, next:NextFunction)=>{
  const pathname = req.url
  console.log(pathname);
  res.status(404).json({message:`'${pathname}' this route is not found!`})
})

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({message: err.message, err});
  }
);

export default app;
