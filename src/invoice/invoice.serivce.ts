import { prisma } from "../lib/prisma";

export const createInvoice = async (data:any,user:any)=>{
    return prisma.invoice.create({
        data:{
            amount:data.amount,
            status:data.status || "unpaid",
            customer:{
                connect:{id: data.customerId},
            },
            tenant :{
                connect:{id :user.tenantId},
            },
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
        },
    });
};
