import { Router } from "express";
import {create,getAll,removeExpense,editExpense} from "./expense.controller";
import { allowRoles } from "../../common/guards/role.guard";


const router = Router();

router.post("/",allowRoles("ADMIN"),create);
router.get("/",allowRoles("ADMIN"),getAll);
router.delete("/:id",allowRoles("ADMIN"),removeExpense);
router.put("/:id",allowRoles("ADMIN"),editExpense);

export default router;
