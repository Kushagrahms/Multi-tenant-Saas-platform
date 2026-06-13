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



