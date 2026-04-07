import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("backend running");
});
app.listen(5000,()=>{
    console.log("server running on http://localhost:5000");
});