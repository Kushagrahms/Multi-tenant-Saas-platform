import {z} from "zod";

export const createInvoiceSchema = z.object({
    amount:z.coerce.number().positive()
          .positive("amount must be a ositive number"),

    customerID:z
          .string()
          .uuid("Invalid customer id"),
    bookingId:z
          .string()
          .uuid("invalid booking id")
          .optional(),
    status:z
           .enum(["paid","unpaid"])
           .optional(),
})
