import { z } from "zod";
export const WorkerFormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
  firstName: z
    .string()
    .nonempty("First Name is required")
    .min(3, "FirstName must be atleast 3 characters.")
    .max(52, "FirstName must be less than 52 characters."),
  lastName: z
    .string()
    .nonempty("Last Name is required")
    .min(3, "LastName must be atleast 3 characters.")
    .max(52, "LastName must be less than 52 characters."),
  birthDate: z.string().nonempty("Birth date is required"),
  job: z
    .string()
    .nonempty("Job is required")
    .min(3, "job must be atleast 3 characters.")
    .max(52, "job must be less than 52 characters."),
  tel: z
    .string()
    .nonempty("Tel is required")
    .min(7, "tel must be atleast 7 characters.")
    .max(52, "tel must be less than 52 characters.")
});
