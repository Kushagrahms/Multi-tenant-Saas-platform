import {Router} from "express";
import {create,getAll} from "./bookings.controller";
import { authMiddleware } from "../auth/auth.middleware";

export const router = Router();
router.post("/",authMiddleware,create);
router.get("/",authMiddleware,getAll);

export default router;

