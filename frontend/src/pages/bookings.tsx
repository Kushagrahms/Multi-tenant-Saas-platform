import {useEffect, useState} from "react";
import {getCustomer} from "../api/customer";
import {createBooking, deleteBooking, getBookings, updateBooking} from "../api/bookings";
import { getServices } from "../api/service";

interface Customer{
  id:string;
  name:string;
}
interface Service{
  id:string;
  name:string;
  price:number;
}
interface Booking{
  id:string;
  date:string;
  status:string;
  customer:{
    id:string;
    name:string;
  };
  service:{
    id:string;
    name:string;
    price:number;
  };
}

const BookingsPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingId,setEditingId] = useState<string |null>(null);
  const [searchTerm,setSearchTerm] = useState("");
  const [statusFilter,setStatusFilter] = useState("all");

  const [form,setForm]=useState({
    customerId:"",
    serviceId:"",
    date:"",
    status:"pending",
  });
  const fetchCustomer = async()=>{
    try{
      const data = await getCustomer();
      setCustomers(data);
    }catch(error){
      console.error(error);
    }
  };
  const fetchService = async()=>{
    try{
      const data = await getServices();
      setServices(
        data.filter(
          (service:any)=>service.status==="ACTIVE"
        ));
    }catch(error){
      console.error(error);
    }
  }
  const fetchBooking =  async()=>{
    try{
      const data = await getBookings();
      setBookings(data);
    }catch(error){
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchCustomer();
    fetchService();
    fetchBooking();
  },[]);

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const payload={
        ...form, date:new Date(form.date).toISOString(),
      };
      if(editingId){
        await updateBooking(editingId,payload);
        setEditingId(null);
      }else{
      await createBooking(payload);
      }
      setForm({
        customerId:"",
        serviceId:"",
        date:"",
        status:"pending",
      });
      fetchBooking();
    }catch(error:any){
      console.log(error.response?.data);
    }
  };
  const handleDeleteBooking = async(id:string)=>{
    try{
      await deleteBooking(id);
      setBookings(prev=>
        prev.filter(booking=>booking.id!==id)
      );
    }catch(error){
      console.error(error);
    }
  };
  const handleEditBooking = async(booking:Booking)=>{
    setEditingId(booking.id);
    setForm({
      customerId:booking.customer.id,
      serviceId:booking.service?.id || "",
      date:booking.date.slice(0,16),
      status:booking.status,
    });
  };
  const filteredBookings = bookings.filter((booking)=>{
    const matchsSearch = booking.customer?.name
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" ||
    booking.status === statusFilter;

    return matchesStatus && matchsSearch;
  })

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Bookings
      </h1>
      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="Search customer.." value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value)} className="border p-2 rounded flex-1" />
        <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}
        className="border p-2 rounded">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-4 gap-4">
          <select value={form.customerId} onChange={(e)=>setForm({...form,customerId:e.target.value,})}
          className="border p-2 rounded" required>
            <option value="">Select Customer</option>
            {customers.map((customer)=>(
              <option
              key={customer.id}
              value={customer.id}>
              {customer.name}</option>
            ))}
          </select>
          <select value={form.serviceId} onChange={(e)=>setForm({...form,serviceId:e.target.value})}
          className="border p-2 rounded" required>
            <option value="">Select Service</option>
            {services.map((service)=>(
              <option key={service.id} value={service.id}>{service.name}-₹{service.price}</option>
            ))}
          </select>
          <input type="datetime-local" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})}
          className="border p-2 rounded" required/>
          <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}
          className="border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option> 
            <option value="in_progress">In Progress</option>      
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>                 
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded">
          {editingId?"Update Booking":"Create Booking"}
        </button>
      </form>
        <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Customer
              </th>
              <th className="text-left p-3">
                Service
              </th>              
              <th className="text-left p-3">
                Price
              </th>
              <th className="text-left p-3">
                Date
              </th>
              <th className="text-left p-3">
                Status
              </th>
              <th className="text-left p-3">
                Actions 
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b"
              >
                <td className="p-3">
                  {booking.customer?.name}
                </td>

                <td className="p-3">
                  {booking.service?.name || "-"}
                </td>

                <td className="p-3">
                   ₹{booking.service?.price || 0}
                </td>

                <td className="p-3">
                  {new Date(
                    booking.date
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  {booking.status.replace("_"," ")}
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={()=>handleEditBooking(booking)}
                  className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={()=>
                    handleDeleteBooking(booking.id)
                  } className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;