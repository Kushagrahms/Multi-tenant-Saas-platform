import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { ApiError } from "../../common/utils/ApiError";

export const createStaff = async (data:any, user:any)=>{
    const existingStaff = await prisma.user.findUnique({
        where:{email:data.email}
    });
    if(existingStaff){
        throw new ApiError(409,"Staff with this email already exists");
    }
    console.log("DATA:", data);

    const hashedPassword = await bcrypt.hash(data.password,10);
    return prisma.user.create({
        data:{
            email:data.email,
            password:hashedPassword,
            name:data.name,
            tenantId:user.tenantId,
            role:data.role || "STAFF",
        },
    });
};
export const getStaff = async (user:any)=>{
    return prisma.user.findMany({
        where:{
            tenantId:user.tenantId
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
    });
};