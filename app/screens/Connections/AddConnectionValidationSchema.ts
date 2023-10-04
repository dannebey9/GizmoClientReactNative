import { z } from "zod"

// TODO: Add i18n support
export const AddConnectionValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters long")
    .max(50, "Address must be at most 50 characters long"),
  port: z
    .string()
    .min(3, "Port must be at least 3 characters long")
    .max(50, "Port must be at most 50 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(50, "Password must be at most 50 characters long"),
})
