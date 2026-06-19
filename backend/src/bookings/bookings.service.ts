import { prisma } from "../lib/prisma";
import { ApiError } from "../../common/utils/ApiError";


export const createBookings = async (data:any,user:any)=>{
    const customer = await prisma.customer.findUnique({
    where:{id: data.customerId}
});
if(!customer || customer.tenantId !== user.tenantId){
    throw new ApiError(400,"Invalid customer for this tenant");
}
   const service = await prisma.service.findUnique({
    where:{id:data.serviceId}
   });
   if(!service || service.tenantId!==user.tenantId){
    throw new ApiError(400,"Invaid service for this tenant");
   }
   const booking = await prisma.booking.create({
        data:{
            customerId:data.customerId,
            serviceId:data.serviceId,
            date:data.date,
            status:data.status || "pending",
            tenantId:user.tenantId,
            createdBy:user.userId,
        },
    });
    console.log("BOOKING CREATED:", booking.id);
    await prisma.invoice.create({
        data:{
            amount:service.price,
            status:"unpaid",
            customerId:data.customerId,
            bookingId:booking.id,
            tenantId:user.tenantId,
            createdBy:user.userId,
        },
    });
    console.log("INVOICE CREATED");

    return booking;
};

export const getBookings = async (user:any)=>{
    return prisma.booking.findMany({
        where:{
            tenantId:user.tenantId,
        },
        include:{
            customer:true,
            service:true,
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

export const updateBooking = async(
    id:string,
    data:any,
    user:any
)=>{
    const booking = await prisma.booking.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        }
    });
    if(!booking){
        throw new ApiError(404,"Booking not found");
    }
    const updatebooking = await prisma.booking.update({
        where:{id},
        data:{
            customerId:data.customerId,
            serviceId:data.serviceId,
            date:data.date,
            status:data.status,
        },
    });
    if(data.status === "completed"){
        await prisma.invoice.updateMany({
            where:{
                bookingId:id,
                tenantId:user.tenantId,
            },
            data:{
                status:"paid",
            },
        });
    }

    return updatebooking;
};
