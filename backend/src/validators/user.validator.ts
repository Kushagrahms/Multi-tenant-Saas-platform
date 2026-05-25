import {z} from "zod";

export const createStaffSchema = z.object({
    email:z
         .string()
         .email("invalid email")
         .trim()
         .toLowerCase(),
    password:z 
            .string()
            .min(6,"Password must be of atleast 6 length"),
    name:z
         .string()
         .min(2)
         .max(50),
    role:z
         .enum(["Admin","Staff"])
         .optional(),

});
