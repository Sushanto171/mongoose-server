import { model } from "mongoose";

import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import validator from "validator";
import {
  IUser,
  UserInstanceMethod,
  UserStaticMethod,
} from "../interfaces/user.interface";
const addressSchema = new Schema(
  {
    country: {
      type: String,
      enum: ["Bangladesh", "US", "India", "Others"],
      default: "Bangladesh",
    },
    city: { type: String, enum: ["Dhaka", "Shylet", "Rangpur", "Others"] },
  },
  { _id: false }
);

const friendSchema = new Schema(
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
  {
    _id: false,
  }
);

export const userSchema = new Schema<
  IUser,
  UserStaticMethod,
  UserInstanceMethod
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, "Name have not 15 characters longer. got {VALUE} "],
      minlength: [3, "Name have not 3 characters shorter. got {VALUE} "],
    },
    password: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Invalid type email!"],
      unique: [true, "this email already exist."],
      trim: true,
      index: true,
      lowercase: true,
      // approach 1
      validate: [validator.isEmail, "Invalid type {VALUE} email"],
      // approach 2
      // validate: {
      //   validator:function(value){
      //     return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
      //   },
      //   message: (props)=> `Invalid ${props.value} email address.`
      // }

      // approach 3
      // match: [
      //   /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      //   "Please type valid email address.",
      // ],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "CUSTOM"],
      uppercase: true,
      required: true,
    },
    address: {
      type: addressSchema,
    },
    friends: [{ type: friendSchema }],
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
    role: {
      type: String,
      enum: {
        values: ["ADMIN", "USER", "SUPER-ADMIN"],
        message: "Invalid role '{VALUE}'",
      },
      default: "ADMIN",
      uppercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.updateName = function (name) {
  this.name = name;
  return this.save();
};

userSchema.method(
  "hashPassword",
  async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
    return hashedPassword;
  }
);

userSchema.static("findByEmail", function findByEmail(email: string) {
  return this.findOne({ email });
});

userSchema.static('hashPassword', async function hashPassword(password:string){
  const hash =await bcrypt.hash(password, 10)
  return hash
})

// middleware
// pre
userSchema.pre<IUser>("save",async function (next) {
  // console.log("✅ Pre Middleware",this.password);
  this.password = await bcrypt.hash(this.password, 10)
  next();
});

// post
userSchema.post<IUser>('save', function(res, next){
  console.log( "%s ✅ Has successfully save", res.email);
  return next()
})

export const User = model<IUser, UserStaticMethod>("User", userSchema);
