import { z } from "zod";
export const WorkerFormSchema = z.object({
  email: z.string().email("Please-enter-a-valid-email-adress"),
  firstName: z
    .string()
    .nonempty("First-Name-is-required")
    .min(3, "First-Name-must-be-atleast-3-characters.")
    .max(52, "First-Name-must-be-less-than-52-characters"),
  lastName: z
    .string()
    .nonempty("Last-Name-is-required")
    .min(3, "LastName-must-be-atleast-3-characters")
    .max(52, "LastName-must-be-less-than-52-characters"),
  birthDate: z.string().nonempty("Birth-date-is-required"),
  job: z
    .string()
    .nonempty("Job-is-required")
    .min(3, "Job-must-be-atleast-3-characters")
    .max(52, "Job-must-be-less-than-52-characters"),
  tel: z
    .string()
    .nonempty("Tel-is-required")
    .min(7, "Tel-must-be-atleast-7-characters")
    .max(52, "Tel-must-be-less-than-52-characters")
});
