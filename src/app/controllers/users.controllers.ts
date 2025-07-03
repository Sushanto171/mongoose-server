import express, { Request, Response } from "express";
import { User } from "../models/users.model";

export const userRoutes = express.Router();

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const user = req.body;
  // const newUser = new User({
  //   address:{
  //     country:"Bangladesh",
  //     city:"Rangpur"
  //   },
  //   age:23,
  //   email: "sushantos@gmail.com",
  //   friends:[{name:'sushanto',
  //     email: "hello@gmail.com"
  //   }],
  //   gender:"Male",
  //   name:"Sushanto"
  // })

  // newUser.save()
  const newUser = await User.create(user);
  res.json(newUser);
});

userRoutes.patch("/update-user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  res.json({ message: "User updated successfully!", user });
});

userRoutes.delete("/delete-user/:id",async(req:Request,res:Response)=>{
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId)
   res.json({message: "Successfully deleted the user.", user})
})

userRoutes.get("/:id",async(req:Request,res:Response)=>{
  const userId = req.params.id;
  const user = await User.findById(userId)
   res.json({message: "User fetched successfully!", user})
})
