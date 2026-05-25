import {api} from "../lib/axios";

export const loginUser = async(data:{
    email:string;
    password:string;
})=>{
    const response = await api.post("/auth/login",data);
    return response.data;
};

export const registerUser =async(data:{
    email:string;
    password:string;
    tenantName:string;
    name?:string;
})=>{
    const response = await api.post("/auth/register",data);
    return response.data;
}