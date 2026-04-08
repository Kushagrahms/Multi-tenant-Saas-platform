import { createCustomer } from "./customers.service";
import { Request, Response } from "express";
import { getCustomers } from "./customers.service";
export const create = async (req:Request, res:Response)=>{
    try{
        const user = (req as any).user;
        const customer = await createCustomer(req.body,user);
        res.status(201).json(customer);
    }catch(err:any){
        res.status(400).json({error:err.message});
    }
};
export const getAll = async (req:Request,res:Response)=>{
    try{
        const user =(req as any).user;
        const customers = await getCustomers(user);
        res.json(customers);
    }catch(err:any){
        res.status(400).json({error:err.message});;
    }
};