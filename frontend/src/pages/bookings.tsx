import {useEffect, useState} from "react";
import {getCustomer} from "../api/customer";
import {createBooking, deleteBooking, getBookings, updateBooking} from "../api/bookings";

interface Customer{
  id:string;
  name:string;
}
interface Booking{
  id:string;
  date:string;
  status:string;
  customer:{
    id:string;
    name:string;
  };
}

const BookingsPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingId,setEditingId] = useState<string |null>(null);

  const [form,setForm]=useState({
    customerId:"",
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
      date:booking.date.slice(0,16),
      status:booking.status,
    });
  };

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Bookings
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-3 gap-4">
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
          <input type="datetime-local" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})}
          className="border p-2 rounded" required/>
          <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}
          className="border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>       
            <option value="completed">Completed</option>                 
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
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b"
              >
                <td className="p-3">
                  {booking.customer?.name}
                </td>

                <td className="p-3">
                  {new Date(
                    booking.date
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  {booking.status}
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