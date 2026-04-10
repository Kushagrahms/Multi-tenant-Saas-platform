import { Response, Request } from "express";
import { createInvoice,getInvoice} from "./invoice.serivce";

export const create = async(req:Request,res:Response)=>{
    try{
        const user = (req as any).user;
        if(user.role !== "ADMIN"){
            return res.status(403).json({error:"only admin can create invoice"});
        }
        const invoice = await createInvoice(req.body,user);
        res.status(201).json(invoice);
    }catch(err:any){
        res.status(400).json({error:err.message});
    }
};

export const getAll = async(req:Request,res:Response)=>{
    try{
        const user = (req as any).user;
        const invoice = await getInvoice(user);
        res.json(invoice);
    }catch(err:any){
        res.status(400).json({error:err.message});
    }
};
