import express, { Request, Response } from "express";
import {
  CreateUserInput,
  createUserZodSchema,
} from "../interfaces/user.zod.interface";
import { User } from "../models/users.model";

export const userRoutes = express.Router();

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const user: CreateUserInput = await createUserZodSchema.parseAsync(
      req.body
    );

    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    // next(error)
    // console.log("❌❌❌", error);
    throw error;
  }
});

userRoutes.patch("/update-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  res.json({ message: "User updated successfully!", user });
});

userRoutes.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  res.json({ message: "Successfully deleted the user.", user });
});

userRoutes.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.json({ message: "User fetched successfully!", user });
});
