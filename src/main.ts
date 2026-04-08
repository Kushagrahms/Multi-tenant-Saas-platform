import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes";
import { authMiddleware } from "./auth/auth.middleware";


const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/api/test",authMiddleware,(req,res)=>{
    res.json((req as any).user);
});
app.get("/",(req,res)=>{
    res.send("backend running");
});
app.listen(5000,()=>{
    console.log("server running on http://localhost:5000");
});
console.log("JWT_SECRET:",process.env.JWT_SECRET);