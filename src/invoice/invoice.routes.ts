import {Router} from "express"
import {create,getAll} from "./invoice.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createInvoiceSchema } from "../validators/invoice.validator";

export const router=Router();

router.post("/",allowRoles("ADMIN"),validate(createInvoiceSchema),create);
router.get("/",allowRoles("ADMIN"),getAll);

export default router;

