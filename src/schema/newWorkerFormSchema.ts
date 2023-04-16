import { z } from "zod";
export const WorkerFormSchema = z.object({
    email: z.string().email("Please enter a valid email adress."),
    firstName: z
      .string()
      .min(3, "FirstName must be atleast 3 characters.")
      .max(52, "FirstName must be less than 52 characters."),
      lastName: z
      .string()
      .min(3, "LastName must be atleast 3 characters.")
      .max(52, "LastName must be less than 52 characters."),
      birthDate: z
      .string()
      .min(8, "Birth Date must be atleast 8 characters.")
      .max(52, "Birth Date must be less than 52 characters."),
      job: z
      .string()
      .min(3, "job must be atleast 3 characters.")
      .max(52, "job must be less than 52 characters."),
      tel: z
      .string()
      .min(7, "tel must be atleast 7 characters.")
      .max(52, "tel must be less than 52 characters."),
  });