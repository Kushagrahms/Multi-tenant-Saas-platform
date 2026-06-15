import {api} from "../lib/axios";

export const getStaff = async()=>{
    const response = await api.get("/users");
    return response.data;
};

export const createStaff = async(data:{
    name:string;
    email:string;
    password:string;
    role:string;
})=>{
    const response = await api.post("/users",data);
    return response.data;
};
export const deleteStaff = async(id:string)=>{
    const res=await api.delete(`/users/${id}`);
    return res.data;
};
export const updateStaff = async(id:String,data:any)=>{
    const response = await api.put(`/users/${id}`,data);
    return response.data;
};
