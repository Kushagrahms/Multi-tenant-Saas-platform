import { z } from "zod";

export const registerSchema = z.object({
    email:z
         .string()
         .email("invalid email")
         .trim()
         .toLowerCase(),
    password:z
         .string()
         .min(6,"Password must atleast 6 characters")
         .max(100),
    name:z
         .string()
         .min(2,"Name must be atleast 2 characters")
         .max(50)
         .optional(),
    tenantName:z
          .string()
          .min(2,"Tenant name must be atleast 2 characters")
          .max(100),
});

export const loginSchema = z.object({
    email:z
          .string()
          .email("invalid email")
          .trim()
          .toLowerCase(),
    password:z
          .string()
          .min(6,"password must be 6 character long"),
});
