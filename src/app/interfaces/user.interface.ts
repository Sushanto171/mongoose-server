import { Model } from "mongoose";

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

export interface UserMethod {
  updateName(name: string): Promise<any>;
  hashPassword(password: string):  string;
}
