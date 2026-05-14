import { Router} from "express";
import { create} from "./users.controller";
import { authMiddleware} from "../auth/auth.middleware";
import { getAllStaff } from "./users.controller";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createStaffSchema } from "../validators/user.validator";

const router=Router();

router.post("/",authMiddleware,allowRoles("ADMIN"),validate(createStaffSchema),create);
router.get("/",authMiddleware,allowRoles("ADMIN","STAFF"),getAllStaff);
export default router;
