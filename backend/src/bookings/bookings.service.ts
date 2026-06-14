import { prisma } from "../lib/prisma";
import { ApiError } from "../../common/utils/ApiError";


export const createBookings = async (data:any,user:any)=>{
    const customer = await prisma.customer.findUnique({
    where:{id: data.customerId}
});
if(!customer || customer.tenantId !== user.tenantId){
    throw new ApiError(400,"Invalid customer for this tenant");
}
   return prisma.booking.create({
        data:{
            customerId:data.customerId,
            date:data.date,
            status:data.status || "pending",
            tenantId:user.tenantId,
            createdBy:user.userId,
        },
    });
};

export const getBookings = async (user:any)=>{
    return prisma.booking.findMany({
        where:{
            tenantId:user.tenantId,
        },
        include:{
            customer:true,
        },
    });
};

export const deleteBooking = async(
    id:string,
    user:any
)=>{
    const booking = await prisma.booking.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!booking){
        throw new ApiError(404,"Booking not found");
    }
    return prisma.booking.delete({
        where:{id},
    });
};

