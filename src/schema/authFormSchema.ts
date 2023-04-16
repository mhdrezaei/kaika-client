import { z } from "zod";
export const FormSchema = z.object({
    email: z.string().email("Please enter a valid email adress."),
    password: z
      .string()
      .min(3, "Password must be atleast 3 characters.")
      .max(52, "Password must be less than 52 characters."),
  });