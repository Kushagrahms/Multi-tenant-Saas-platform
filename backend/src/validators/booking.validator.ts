import {z} from "zod";

export const createBookingSchema = z.object({
    customerId:z
              .string()
              .uuid("invalid customer id"),
    date:z
         .string()
         .datetime("invalid booking date"),
    status:z
         .enum(["pending","confirmed","cancelled"])
         .optional(),
})