import { prisma } from "../lib/prisma";

export const creatExpense = async(data:any, user:any)=>{
    return prisma.expense.create({
        data:{
            title:data.title,
            amount:Number(data.amount),
            category:data.category,
            notes:data.notes,
            tenantId:user.tenantId,
        },
    });
};

export const getExpense = async(user:any)=>{
    return prisma.expense.findMany({
        where:{
            tenantId:user.tenantId,
        },
        orderBy:{
            createdAt:"desc",
        },
    });
};

export const deleteExpense = async(id:string,user:any)=>{
    const expense = await prisma.expense.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!expense){
        throw new Error("Expense not found");
    }
    return prisma.expense.delete({
        where:{id},
    });
};

export const updateExepense = async(id:string, data:any, user:any)=>{
    const expense = await prisma.expense.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!expense){
        throw new Error("Expense not found");
    }
    return prisma.expense.update({
        where:{id},
        data:{
            title:data.title,
            amount:Number(data.amount),
            category:data.category,
            notes:data.notes,
        },
    });

};

