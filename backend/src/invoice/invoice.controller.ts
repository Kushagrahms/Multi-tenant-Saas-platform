import { Response, Request,NextFunction } from "express";
import { createInvoice,getInvoice,deleteInvoice,updateInvoice} from "./invoice.service";

export const create = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;
        if(user.role !== "ADMIN"){
            return res.status(403).json({error:"only admin can create invoice"});
        }
        const invoice = await createInvoice(req.body,user);
        res.status(201).json(invoice);
    }catch(err){
        next(err);
    }
};

export const getAll = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const invoice = await getInvoice(user);
        res.json(invoice);
    }catch(err){
        next(err);
    }
};
export const removeInvoice = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        if(user.role!=="ADMIN"){
            return res
            .status(403).json({error:"Only admin can delete invoices"});
        }
        await deleteInvoice(req.params.id as string,user);
        res.json({message:"Invoice deleted Successfully"});
    }catch(err){
        next(err);

    }
};
export const editInvoice = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;

      const invoice = await updateInvoice(
      req.params.id as string,req.body,user
    );
    res.json(invoice);
    }catch(err){
        next(err);
    }
};