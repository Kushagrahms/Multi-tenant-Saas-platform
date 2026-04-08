import { Router } from "express";
import {create, getAll} from "./customers.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router  =Router();
router.post("/",authMiddleware,create);
router.get("/",authMiddleware,getAll);

export default router;

