export interface IUser {
  name: string;
  email: string;
  gender: "Male" | "Female" | "Custom";
  age: number;
  address: {
    country: "Bangladesh" | "US" | "India";
    city: "Dhaka" | "Shylet" | "Rangpur";
  };
  friends: 
    {
      name:string,
      email: string
    }[],
  skills: string[],
  isActive: boolean
}


