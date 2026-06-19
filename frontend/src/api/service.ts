import { api } from "../lib/axios";

export const getServices = async()=>{
    const response = await api.get("/services");
    return response.data;
};

export const createService = async(data:{
    name:string;
    price:number;
    duration: number;
    status: string;
})=>{
    const response = await api.post("/services",data);
    return response.data;
};
export const updateService = async(id:string,data:{
    name:string;
    price:number;
    duration: number;
    status: string;
})=>{
    const response = await api.put(`/services/${id}`,data);
    return response.data;
};
export const deleteService = async(id:string)=>{
    const response = await api.delete(`/services/${id}`);
    return response.data;

};

