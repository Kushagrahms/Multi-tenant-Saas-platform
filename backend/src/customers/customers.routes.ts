import { Router } from "express";
import {create, getAll, removeCustomer, editCustomer} from "./customers.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createCustomerSchema } from "../validators/customer.validator";
import { updateCustomer } from "./customers.service";

const router  =Router();
router.post("/",allowRoles("ADMIN","STAFF"),validate(createCustomerSchema),create);
router.get("/",allowRoles("ADMIN","STAFF"),getAll);
router.delete("/:id",allowRoles("ADMIN","STAFF"),removeCustomer);
router.put("/:id",allowRoles("ADMIN","STAFF"),editCustomer);
export default router;

