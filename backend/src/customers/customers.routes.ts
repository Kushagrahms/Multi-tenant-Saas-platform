import { Router } from "express";
import {create, getAll} from "./customers.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createCustomerSchema } from "../validators/customer.validator";

const router  =Router();
router.post("/",allowRoles("ADMIN","STAFF"),validate(createCustomerSchema),create);
router.get("/",allowRoles("ADMIN","STAFF"),getAll);

export default router;

