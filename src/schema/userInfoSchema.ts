import { z } from "zod";
export const UserInfoSchema = z.object({
  email: z.string().email("Please-enter-a-valid-email-adress"),
  firstName: z
    .string()
    .nonempty("First-Name-is-required")
    .min(3, "First-Name-must-be-atleast-3-characters")
    .max(52, "First-Name-must-be-less-than-52-characters"),
  lastName: z
    .string()
    .nonempty("Last-Name-is-required")
    .min(3, "Last-Name-must-be-atleast-3-characters")
    .max(52, "Last-Name-must-be-less-than-52-characters"),
  officialName: z.string().nonempty("Official-Name-is-required"),
  address: z.string().nonempty("Address-is-required"),
  tel: z
    .string()
    .nonempty("Tel-is-required")
    .min(7, "Tel-must-be-atleast-7-characters")
    .max(13, "Tel-must-be-less-than-13-characters"),
    password: z
    .string()
    .nonempty("Password-is-required")
    .min(3, "Password-must-be-atleast-3-characters")
    .max(52, "Password-must-be-less-than-52-characters"),
    newPassword: z
    .string()
    .nonempty("Password-is-required")
    .min(3, "Password-must-be-atleast-3-characters")
    .max(52, "Password-must-be-less-than-52-characters"),
});
