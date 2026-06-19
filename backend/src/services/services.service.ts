import { prisma } from "../lib/prisma";

export const createService = async (data:any, user:any)=>{
    return prisma.service.create({
        data:{
            name:data.name,
            price:Number(data.price),
            duration:Number(data.duration),
            status:data.status || "ACTIVE",
            tenantId:user.tenantId,
        },
    });
};

export const getService = async(user:any)=>{
    return prisma.service.findMany({

        where:{
            tenantId:user.tenantId,
        },
        orderBy:{
            createdAt:"desc",

        },
    });
};

export const deleteService = async(id:string,user:any)=>{
    const service = await prisma.service.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!service){
        throw new Error("Service not found");
    }
    return prisma.service.delete({
        where:{id},
    });
};
export const updateService = async(id:string,data:any,user:any)=>{
    const service = await prisma.service.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!service){
        throw new Error("Service not found");
    }
    return prisma.service.update({
        where:{id},
        data:{
            name:data.name,
            price:Number(data.price),
            duration:Number(data.duration),
            status:data.status,
        },
    });
};

