import {api} from "../lib/axios";

export const getInvoice = async()=>{
    const response = await api.get("/invoices");
    return response.data;
};

export const createInvoice = async(data:{
    customerId:string;
    bookingId:string;
    amount:number;
    status:string;
})=>{
    const response = await api.post("/invoices",data);
    return response.data;
};
export const deleteInvoice = async(id:String)=>{
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
};
export const updateInvoice = async(id:String,data:any)=>{
    const response = await api.put(`/invoices/${id}`,data);
    return response.data;
};
