import { useState, useEffect } from "react";
import {createCustomer, getCustomer} from "../api/customer";

interface Customer {
  id:string;
  name:string;
  email:string;
  phone:string;
}

const CustomerPage = () => {
  const [customers, setCustomers]= useState<Customer[]>([]);
  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
  });
  const fetchCustomer = async()=>{
    try{
      const data = await getCustomer();
      setCustomers(data);
    }catch(error){
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchCustomer();
  },[]);

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      await createCustomer(form);
      setForm({
        name:"",
        email:"",
        phone:"",
      });
      fetchCustomer();
    }catch(error){
      console.error(error);
    }
  };
  return (
    <div className="p-6">
      <h1  className="text-2xl font-bold mb-6">
        Customers
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input type ="text" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}
          className="border p-2 rounded" />

          <input type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}
          className="border p-2 rounded" />

          <input type="text" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})}
          className="border p-2 rounded" />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded">Add Customer</button>
      </form>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customers)=>(
              <tr key={customers.id} className="border-b">
                <td className="p-3">{customers.name}</td>
                <td className="p-3">{customers.email}</td>
                <td className="p-3">{customers.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default CustomerPage;