import { Request, Response,NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const result  = await registerUser(req.body);
        res.status(201).json(result);
    }
    catch(err){
        next(err);
        }
};
export const login = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const{email,password}=req.body;
        const result = await loginUser(email,password);
        res.json(result);
    }
    catch(err){
       next(err);
    }
};

