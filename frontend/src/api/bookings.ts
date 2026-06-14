import {api} from "../lib/axios";

export const getBookings  = async()=>{
    const response = await api.get("/bookings");
    return response.data;
};

export const createBooking = async(data:{
    customerId:string,
    date:string,
    status:string,
})=>{
    const response = await api.post("/bookings",data);
    return response.data;

};
export const deleteBooking = async(id:string)=>{
    const res = await api.delete(`/bookings/${id}`);
    return res.data;
};
