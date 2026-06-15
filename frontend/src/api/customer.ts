import {api} from "../lib/axios";

export const getCustomer = async() =>{
    const response = await api.get("/customers");
    return response.data;
};

export const createCustomer = async(data:{
    name:string,
    email:string,
    phone:string,
})=>{
    const response = await api.post("/customers",data);
    return response.data;
};
export const deleteCustomer = async(id:string)=>{
    const res = await api.delete(`/customers/${id}`);
    return res.data;
};

export const updateCustomer = async(id:String,data:any)=>{
    const response = await api.put(`/customers/${id}`,data);
    return response.data;
};

