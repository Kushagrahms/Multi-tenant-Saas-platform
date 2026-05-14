import {Router} from "express";
import {create,getAll} from "./bookings.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createBookingSchema } from "../validators/booking.validator";

export const router = Router();
router.post("/",allowRoles("ADMIN","STAFF"),validate(createBookingSchema),create);
router.get("/",allowRoles("ADMIN","STAFF"),getAll);

export default router;

