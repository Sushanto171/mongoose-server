import z from "zod";

 export const createUserZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gender: z.enum(["MALE", "FEMALE", "CUSTOM"]),
  address: z.object({
    country: z.enum(["Bangladesh", "US", "India", "Others"]),
    city: z.enum(["Dhaka", "Shylet", "Rangpur", "Others"]),
  }),
  friends: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
    })
  ).optional(),
  age: z.number().max(60).min(18),
  skills: z.array(z.string()).optional(),
  isActive: z.boolean().default(false).optional(),
  phone: z.string().regex(/^(\+8801|01)[0-9]{9}$/, "Invalid phone number"),
  role: z.enum(["ADMIN", "USER", "SUPER-ADMIN"]).default("USER").optional(),
});

export type CreateUserInput = z.infer<typeof createUserZodSchema>;