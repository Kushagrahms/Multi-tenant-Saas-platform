import { Request, Response,NextFunction} from "express";
import { createStaff, getStaff, deleteStaff} from "./users.service";


export const create = async(req:Request,res:Response,next:NextFunction)=>{
    try {const user = (req as any).user;
        if(user.role !== "ADMIN"){
            return res.status(403).json({error:"only admin can create staff"});
        }
        const staff = await createStaff(req.body,user);
        res.status(201).json(staff);
    }catch(err){
        next(err);
    }
};
export const getAllStaff = async(req:any,res:any,next:NextFunction)=>{
    const user = req.user;
    const staff = await getStaff(user);
    res.json(staff);
};
export const removeStaff = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const user = (req as any).user;
        await deleteStaff(req.params.id as string,user);
        res.json({ message:"Staff removed Successfully"});
      }catch(err){
            next(err);
        }
    };

