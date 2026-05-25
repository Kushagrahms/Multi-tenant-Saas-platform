import { z } from "zod";
import {Request,Response,NextFunction} from "express";

export const validate=(Schema:z.ZodSchema)=> async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        await Schema.parseAsync(req.body);
        next();
    }catch(err:any){
        return res.status(400).json({errors:err.issues,});
    }
};
