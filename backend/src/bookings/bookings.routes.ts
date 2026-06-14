import {Router} from "express";
import {create,getAll,removeBooking} from "./bookings.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createBookingSchema } from "../validators/booking.validator";

export const router = Router();
router.post("/",allowRoles("ADMIN","STAFF"),validate(createBookingSchema),create);
router.get("/",allowRoles("ADMIN","STAFF"),getAll);
router.delete("/:id",allowRoles("ADMIN","STAFF"),removeBooking);
export default router;

