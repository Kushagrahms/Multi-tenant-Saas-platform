import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async( data:{
    email: string;
    password: string;
    name?: string;
    tenantName: string;
}) =>  {
    const hashedPassword = await bcrypt.hash(data.password,10);

    //creating tenant
    const tenant = await prisma.tenant.create({
        data:{
            name:data.tenantName,
        },
    })
    //creating user connectedd to tenant
    const user = await prisma.user.create({
        data: {
            email:data.email,
            password:hashedPassword,
            name:data.name ?? null,
            tenantId:tenant.id,
        },
    });
    return {user, tenant};
};

export const loginUser = async( email:string,password:string)=>{
    const user = await prisma.user.findUnique({
        where:{
            email:email, 
        },
    });

    if(!user){
        throw new Error("User not found");
    }
    const isValid=await bcrypt.compare(password,user.password);
    if(!isValid){
        throw new Error("invalid password");
    }
    const token = jwt.sign(
        {        
        userId: user.id,
        tenantId: user.tenantId,
        },
        JWT_SECRET,{expiresIn:"1d"}
   );
   return {token};

};
