import { createCustomer } from "./customers.service";
import { Request, Response,NextFunction } from "express";
import { getCustomers } from "./customers.service";
export const create = async (req:Request, res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const customer = await createCustomer(req.body,user);
        res.status(201).json(customer);
    }catch(err){
        next(err);
    }
};
export const getAll = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user =(req as any).user;
        const customers = await getCustomers(user);
        res.json(customers);
    }catch(err){
        next(err);
    }
};