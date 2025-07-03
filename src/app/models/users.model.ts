import { model } from "mongoose";

import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, "Name have not 15 characters longer. got {VALUE} "],
      minlength: [3, "Name have not 3 characters shorter. got {VALUE} "],
    },
    email: {
      type: String,
      required: [true, "Invalid type email!"],
      unique: [true, "this email already exist."],
      trim: true,
      index: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please type valid email address.",
      ],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "CUSTOM"],
      uppercase: true,
      required: true,
    },
    address: {
      country: {
        type: String,
        enum: ["Bangladesh", "US", "India", "Others"],
        default: "Bangladesh",
      },
      city: { type: String, enum: ["Dhaka", "Shylet", "Rangpur", "Others"] },
    },
    friends: [
      {
        name: { type: String },
        email: {
          type: String,
          trim: true,
          lowercase: true,
          match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please type valid email address.",
          ],
        },
      },
    ],
    age: {
      type: Number,
      max: [60, "Age must be less then 60. got {VALUE}"],
      min: [18, "Age must be gater then 18. got {VALUE}"],
      required: true,
    },
    skills: [{ type: String, default: "" }],
    isActive: { type: Boolean, default: false },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
