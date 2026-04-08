import {Response,Request} from "express";
import {createBookings,getBookings} from "./bookings.service";  

export const create  =async (req:Request,res:Response)=>{
    try{
        const user = (req as any).user;
        const booking  =await createBookings(req.body,user);
        res.status(201).json(booking);
    }catch(err:any){
        res.status(400).json({error:err.messsage});
    }
};

export const getAll = async (req:Request,res:Response)=>{
    try{
        const user  =(req as any).user;
        const bookings = await getBookings(user);
        res.json(bookings);
    }catch(err:any){
        res.status(400).json({error:err.message});
    }
};