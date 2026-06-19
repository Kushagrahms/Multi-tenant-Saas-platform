import { Router } from "express";
import { create, getAll, editService, removeService } from "./service.controller";
import { allowRoles } from "../../common/guards/role.guard";

const router = Router();

router.post("/",allowRoles("ADMIN","STAFF"),create);
router.put("/:id",allowRoles("ADMIN","STAFF"),editService);
router.get("/",allowRoles("ADMIN","STAFF"),getAll);
router.delete("/:id",allowRoles("ADMIN","STAFF"),removeService);

export default router;

