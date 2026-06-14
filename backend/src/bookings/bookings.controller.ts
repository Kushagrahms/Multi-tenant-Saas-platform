import {Response,Request,NextFunction} from "express";
import {createBookings,getBookings, deleteBooking} from "./bookings.service";  

export const create  =async (req:Request,res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        const booking  =await createBookings(req.body,user);
        res.status(201).json(booking);
    }catch(err){
        next(err);
    }
};

export const getAll = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user  =(req as any).user;
        const bookings = await getBookings(user);
        res.json(bookings);
    }catch(err){
        next(err);
    }
};

export const removeBooking = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = (req as any).user;
        await deleteBooking(
            req.params.id as string,
            user
        );
        res.json({
            message:"Booking deleted Successfully",
        });
    }catch(err){
        next(err);
    }
};
