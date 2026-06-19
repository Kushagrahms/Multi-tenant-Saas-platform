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
            booking:{
                include:{
                    service:true,
                }
            },
        },
    });
};

export const deleteInvoice = async (invoiceId:string,user:any)=>{
    const invoice = await prisma.invoice.findUnique({
        where:{
            id:invoiceId,
        },
    });
    if(!invoice || invoice.tenantId!==user.tenantId){
        throw new ApiError(404,"Invoice not found");
    }
    return prisma.invoice.delete({
        where:{
            id:invoiceId,
        },
    });
};
export const updateInvoice = async(
    id:string,
    data:any,
    user:any,
)=>{
    const invoice = await prisma.invoice.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!invoice){
        throw new ApiError(404,"invoice not found");
    }
    return prisma.invoice.update({
        where:{id},
        data:{
            customerId: data.customerId,
            bookingId: data.bookingId || null,
            amount: Number(data.amount),
            status: data.status,
        },
    });
};
