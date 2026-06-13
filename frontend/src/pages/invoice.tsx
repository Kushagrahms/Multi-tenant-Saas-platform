import {useEffect, useState} from "react";
import {getInvoice, createInvoice} from "../api/invoice";
import { getCustomer } from "../api/customer";
import { getBookings } from "../api/bookings";

const InvoicePage = () => {
  const [invoice,setInvoice] = useState<any[]>([]);
  const [customers,setCustomers] = useState<any[]>([]);
  const [bookings,setBookings]  =useState<any[]>([]);

  const [customerId,setCustomerId] = useState("");
  const [bookingId,setBookingId] = useState("");
  const [amount,setAmount] = useState("");
  const [status,setStatus] = useState("unpaid");

  const fetchData = async()=>{
    try{
      const invoiceData = await getInvoice();
      const customerData = await getCustomer();
      const bookingData = await getBookings();

      setInvoice(invoiceData);
      setCustomers(customerData);
      setBookings(bookingData);
    }catch(error){
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleCreateInvoice = async(
    e:React.FormEvent<HTMLFormElement>
  )=>{
    e.preventDefault();

    try{
      await createInvoice({
        customerId,
        bookingId:bookingId,
        amount:Number(amount),
        status,
      });

      setCustomerId("");
      setBookingId("");
      setAmount("");
      setStatus("unpaid");

      fetchData();
    }catch(error){
      console.error(error);
    }
  };


  return(
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <form className="space-y-4 border p-4 rounded-lg mb-8" onSubmit={handleCreateInvoice}>
        <select value={customerId} onChange={(e)=>setCustomerId(e.target.value)}
        className="border p-2 w-full" required>
          <option value=""> Select Customer</option>
          {customers.map((customer)=>(
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
        <select value={bookingId} onChange={(e)=>setBookingId(e.target.value)}
        className="border p-2 w-full">
          <option value="">No booking</option>
          {bookings.map((booking)=>(
            <option key={booking.id} value={booking.id}>
              {booking.customer?.name}-{" "} 
              {new Date(booking.date).toLocaleDateString()}
            </option>
          ))}
          </select>     
          <input type="Number" placeholder="Amount" value={amount} 
          onChange={(e)=>setAmount(e.target.value)} className="border p-2 w-full" required />
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="border p-2 w-full">
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Invoice</button>
         </form>

         <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">Customer</th>
              <th className="p-2">Booking</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((invoice)=>(
              <tr key={invoice.id} className="border-b">
                <td className="p-2">{invoice.customer?.name}</td>
                <td className="p-2">{invoice.booking?.id}</td>
                <td className="p-2">₹{invoice.amount}</td>
                <td className="p-2">{invoice.status}</td>
                <td className="p-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
         </table>
    </div>
  ) ;
};

export default InvoicePage;