import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

export const createStaff = async (data:any, user:any)=>{
    console.log("DATA:", data);

    const hashedPassword = await bcrypt.hash(data.password,10);
    return prisma.user.create({
        data:{
            email:data.email,
            password:hashedPassword,
            name:data.name,
            tenantId:user.tenantId,
            role:data.role || "USER",
        },
    });
};
