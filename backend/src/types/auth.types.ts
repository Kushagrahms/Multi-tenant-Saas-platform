import { Request, Response } from 'express';

export interface AuthUser {
    userId:string;
    tenantId:string;
    role:string;
}

export interface AuthRequest extends Request{
    user:AuthUser;
}