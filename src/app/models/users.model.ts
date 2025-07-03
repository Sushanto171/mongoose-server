import { model } from "mongoose";

import { Schema } from "mongoose";

export const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  gender: { type: String,enum:["Male", "Female","Custom"], required:true},
  address: {
    country: {
      type: String,
      enum: ["Bangladesh", "US", "India"],
      default: "Bangladesh",
    },
    city: { type: String, enum: ["Dhaka", "Shylet", "Rangpur"] },
  },
  friends: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  age: { type: Number, max: 80, min: 18, required: true },
  skills: [{ type: String, default: "" }],
  isActive: { type: Boolean, default: false },
}, {
  versionKey: false,
  timestamps:true
});


export const User= model("User", userSchema)