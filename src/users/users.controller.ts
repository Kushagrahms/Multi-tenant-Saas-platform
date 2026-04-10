import { Request, Response} from "express";
import { createStaff} from "./users.service";

export const create = async(req:Request,res:Response)=>{
    try {const user = (req as any).user;
        if(user.role !== "ADMIN"){
            return res.status(403).json({error:"only admin can create staff"});
        }
        const staff = await createStaff(req.body,user);
        res.status(201).json(staff);
    }catch(err:any){
        res.status(400).json({error:err.message});
    }
};