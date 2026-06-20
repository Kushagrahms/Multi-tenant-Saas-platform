import { useState, useEffect } from "react";
import {createCustomer, getCustomer, deleteCustomer,updateCustomer} from "../api/customer";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm ] = useState("");
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
      if(editingId){
        await updateCustomer(editingId,form);
        setEditingId(null);
      }else{
        await createCustomer(form);
      }
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

  const handleDeleteCustomer = async(id:string)=>{
    try{
      await deleteCustomer(id);

      setCustomers(prev=>
        prev.filter(customer=>customer.id!==id)
      );
    }catch(error){
      console.error(error);
    }
  };
  const handleEditCustomer = async(customer:Customer)=>{
    setEditingId(customer.id);
    setForm({
      name:customer.name,
      email:customer.email,
      phone:customer.phone,
    });
  };
  const filteredCustomers = customers.filter((customer)=>
  customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  customer.phone.includes(searchTerm)
  );


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
        <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded">
          {editingId?"Update Customer":"Add Customer"}</button>
      </form>
      <div className="mb-4">
        <input type="text" placeholder="Search by name,email or phone..." value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Actions</th>
              <th className="text-left p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer)=>(
              <tr key={customer.id} className="border-b">
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={()=>handleEditCustomer(customer)}
                      className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>                    
                   <button onClick={()=>handleDeleteCustomer(customer.id)}
                   className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
                <td className="p-3">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default CustomerPage;