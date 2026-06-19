import { createService,getService, updateService,deleteService} from "./services.service";
import { Request,Response,NextFunction} from "express";

export const create =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const service = await createService(req.body,user);

        res.status(201).json(service);
    }catch(err){
        next(err);
    }
};

export const getAll = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const service = await getService(user);

        res.json(service);
    }catch(err){
        next(err);
    }
};
export const removeService = async(
    req:Request,res:Response,next:NextFunction
)=>{
    try{
        const user = (req as any).user;
        await deleteService(req.params.id as string,user);

        res.json({message:"Service removed Successfully"});
        }catch(err){
            next(err);
        }
};
export const editService = async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const service = await updateService(req.params.id as string,req.body,user);
        res.json(service);
    }catch(err){
        next(err);

    }

};
