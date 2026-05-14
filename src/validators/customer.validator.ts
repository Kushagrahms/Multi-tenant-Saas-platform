import {z} from "zod";

export const createCustomerSchema = z.object({
    name:z
         .string()
         .min(2,"name must be atleast 2 characters")
         .max(100),
    email:z
         .string()
         .email("invalid email")
         .trim()
         .toLowerCase(),
    phone:z
         .string()
         .min(10,"Phone number must be 10 digits")

});

