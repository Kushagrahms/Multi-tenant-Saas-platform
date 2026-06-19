import {useEffect, useState} from "react";
import {getInvoice,deleteInvoice} from "../api/invoice";


const InvoicePage = () => {
  const [invoice,setInvoice] = useState<any[]>([]);


  const fetchData = async()=>{
    try{
      const invoiceData = await getInvoice();

      setInvoice(invoiceData);
    }catch(error){
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleDeleteInvoice = async(
    id:String
  )=>{
    try{
      await deleteInvoice(id);

      setInvoice((prev)=>
      prev.filter((inv)=>inv.id!==id));
    }catch(error){
      console.error(error);
    }
  };

  return(
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>


         <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">Customer</th>
              <th className="p-2">Service</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((invoice)=>(
              <tr key={invoice.id} className="border-b">
                <td className="p-2">{invoice.customer?.name}</td>
                <td className="p-2">{invoice.booking?.service?.name || "-"}</td>
                <td className="p-2">₹{invoice.amount}</td>
                <td className="p-2">{invoice.status}</td>
                <td className="p-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td className="p-2 flex gap-2">
                  <button type="button" onClick={()=>handleDeleteInvoice(invoice.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
    </div>
  ) ;
};

export default InvoicePage;