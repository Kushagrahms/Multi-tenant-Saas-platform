import { prisma} from "../lib/prisma";
export const createCustomer = async (data:any,user:any)=>{
    return prisma.customer.create({
        data:{
            name:data.name,
            email:data.email,
            phone:data.phone,
            tenantId:user.tenantId,
        },
    });
};

export const getCustomers = async (user:any)=>{
    return prisma.customer.findMany({
        where:{
            tenantId:user.tenantID,
        },
    });
};


