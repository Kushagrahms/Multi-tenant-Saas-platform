import { Router} from "express";
import { create,getAllStaff, removeStaff } from "./users.controller";
import { authMiddleware} from "../auth/auth.middleware";
import { allowRoles } from "../../common/guards/role.guard";
import { validate } from "../middlewares/validate.middleware";
import { createStaffSchema } from "../validators/user.validator";

const router=Router();

router.post("/",authMiddleware,allowRoles("ADMIN"),validate(createStaffSchema),create);
router.get("/",authMiddleware,allowRoles("ADMIN","STAFF"),getAllStaff);
router.delete("/:id",authMiddleware,allowRoles("ADMIN"),removeStaff);
export default router;
