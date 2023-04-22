import { z } from "zod";
export const UserInfoSchema = z.object({
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
  officialName: z.string().nonempty("Official Name is required"),
  address: z.string().nonempty("Address is required"),
  tel: z
    .string()
    .nonempty("Tel is required")
    .min(7, "tel must be atleast 7 characters.")
    .max(52, "tel must be less than 52 characters."),
    password: z
    .string()
    .nonempty("Tel is required")
    .min(3, "tel must be atleast 3 characters.")
    .max(52, "tel must be less than 52 characters."),
    newPassword: z
    .string()
    .nonempty("Tel is required")
    .min(3, "tel must be atleast 3 characters.")
    .max(52, "tel must be less than 52 characters."),
});
