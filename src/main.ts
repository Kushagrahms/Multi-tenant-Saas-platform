import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes";
import { authMiddleware } from "./auth/auth.middleware";
import customerRoutes from "./customers/customers.routes";
import bookingRoutes from "./bookings/bookings.routes";
import invoiceRoutes from "./invoice/invoice.routes";
import userRoutes from "./users/users.routes";

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/customers",customerRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/invoices",invoiceRoutes);
app.use("/api/users",userRoutes);
app.get("/api/test",authMiddleware,(req,res)=>{
    res.json((req as any).user);
});
app.get("/",(req,res)=>{
    res.send("backend running");
});
app.listen(5000,()=>{
    console.log("server running on http://localhost:5000");
});
