import { prisma } from "../lib/prisma";
import { ApiError } from "../../common/utils/ApiError";

export const createInvoice = async (data:any,user:any)=>{
    const customer = await prisma.customer.findUnique({
        where:{id:data.customerId}
    });
    if(!customer || customer.tenantId !== user.tenantId){
        throw new ApiError(400,"Invalid customer");
    }
    return prisma.invoice.create({
        data:{
            amount:data.amount,
            status:data.status || "unpaid",
            createdBy:user.userId,
            customer:{
                connect:{id: data.customerId},
            },
            tenant :{
                connect:{id :user.tenantId},
            },
            ...(data.bookingId &&{
            booking : {
                connect:{id: data.bookingId},
            },
         }),
        },
    });
};

export const getInvoice = async (user:any)=>{
    return prisma.invoice.findMany({
        where:{
            tenantId:user.tenantId,
        },
        include:{
            customer:true,
            booking:true,
        },
    });
};
