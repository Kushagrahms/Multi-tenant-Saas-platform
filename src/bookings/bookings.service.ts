import { prisma } from "../lib/prisma";


export const createBookings = async (data:any,user:any)=>{
   return prisma.booking.create({
        data:{
            customerId:data.customerId,
            date:data.date,
            status:data.status || "pending",
            tenantId:user.tenantId,
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