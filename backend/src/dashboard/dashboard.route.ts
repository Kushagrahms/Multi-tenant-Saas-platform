import {Router} from "express";
import {getStats} from "./dashboard.controller";
import {authMiddleware} from "../auth/auth.middleware";

const router = Router();

router.get("/stats",authMiddleware, getStats);

export default router;
