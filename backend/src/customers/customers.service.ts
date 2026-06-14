import { prisma} from "../lib/prisma";
export const createCustomer = async (data:any,user:any)=>{
    return prisma.customer.create({
        data:{
            name:data.name,
            email:data.email,
            phone:data.phone,
            tenantId:user.tenantId,
            createdBy:user.userId,
        },
    });
};

export const getCustomers = async (user:any)=>{
    return prisma.customer.findMany({
        where:{
            tenantId:user.tenantId,
        },
    });
};
export const deleteCustomer = async(
    id:string,
    user:any
)=>{
    const customer = await prisma.customer.findFirst({
        where:{
            id,
            tenantId:user.tenantId,
        },
    });
    if(!customer){
        throw new Error("Customer not found");
    }
    return prisma.customer.delete({
        where:{id},
    });
};




