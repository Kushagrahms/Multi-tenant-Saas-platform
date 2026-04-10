import { Router} from "express";
import { create} from "./users.controller";
import { authMiddleware} from "../auth/auth.middleware";

const router=Router();

router.post("/",authMiddleware,create);
export default router;
