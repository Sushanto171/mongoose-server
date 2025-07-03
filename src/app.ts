import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/controllers/users.controllers";
import { noteRoutes } from "./app/controllers/note.controllers";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running..." });
});

app.use('/users',userRoutes)
app.use('/notes', noteRoutes)

export default app;
