import { api } from "../lib/axios";

export const getExpenses = async()=>{
    const response = await api.get("/expenses");
    return response.data;
}

export const createExpense = async(data:{
    title:string;
    amount:number;
    category:string;
    notes?:string;
})=>{
    const response = await api.post("/expenses",data);
    return response.data;    
}

export const updateExpense = async(id:string,data:{
    title:string;
    amount:number;
    category:string;
    notes?:string;
})=>{
    const response = await api.put(`/expenses/${id}`,data);
    return response.data;
};
export const deleteExpense = async(id:String)=>{
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
};
