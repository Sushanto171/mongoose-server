import { Document, Model, mongo } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE" | "CUSTOM";
  age: number;
  address: {
    country: "Bangladesh" | "US" | "India" | "Others";
    city: "Dhaka" | "Shylet" | "Rangpur" | "Others";
  };
  friends: {
    name: string;
    email: string;
  }[];
  skills: string[];
  isActive: boolean;
  phone?: string;
  role: "ADMIN" | "USER" | "SUPER-ADMIN";
}

export interface UserInstanceMethod  {
  updateName(name: string): Promise<any>;
  hashPassword(password: string):  string;
}

export interface UserStaticMethod extends Model<IUser,{}, UserInstanceMethod>{
  findByEmail(email:string):Promise<void>
  hashPassword(password:string) :string
}