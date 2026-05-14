import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export const authMiddleware = (
    req: Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({error: "no tokens provided"});
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({error: "invalid token"});
        }
        const decoded = jwt.verify(token,JWT_SECRET) as {
            userId : string,
            tenantId: string,
            role:string,
        };

        (req as any).user=decoded;

        next();
    }catch(err){
        return res.status(401).json({error:"Unauthorized"});
    }
};
