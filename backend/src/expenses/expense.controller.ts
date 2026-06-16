import {Request,Response,NextFunction} from "express";
import { creatExpense,deleteExpense,updateExepense,getExpense } from "./expense.service";
import { de } from "zod/v4/locales";

export const create = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const expense = await creatExpense(req.body,user);

        res.status(201).json(expense);
    }catch(err){
        next(err);
    }
};

export const getAll = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const expense = await getExpense(user);

        res.json(expense);
    }catch(err){
        next(err);
    }
};

export const removeExpense = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        await deleteExpense(req.params.id as string,user);
        res.json({message:"Expense deleted Successfully"});
    }catch(err){
        next(err);
    }
};

export const editExpense = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const expense = await updateExepense(
            req.params.id as string,req.body,user
        );
        res.json(expense);

    }catch(err){
        next(err);
    }
}