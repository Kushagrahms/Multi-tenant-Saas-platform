import {useEffect, useState} from "react";
import StatCard from "../components/statcard";
import {getDashboardStats} from "../api/dashboard";
import { createExpense , getExpenses , updateExpense, deleteExpense} from "../api/expense";
import { formatDistanceToNow } from "date-fns";

type DashboardStats = {
  totalCustomers:number;
  totalBookings:number;
  latestCustomers:any[];
  latestBookings:any[];
  revenue:number;
  salaryCost:number;
  expenseBreakDown:Record<string,number>;
  otherExpenses:number;
  totalExpenses:number;
  netProfit:number;
};

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers:0,
    totalBookings:0,
    latestCustomers:[],
    latestBookings:[],  
    revenue:0,
    salaryCost:0,
    expenseBreakDown:{},
    otherExpenses:0,
    totalExpenses:0,
    netProfit:0,
  });
  const [title,setTitle] = useState("");
  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [notes,setNotes] = useState("");
  const [expenses, setExepenses] = useState<any[]>([]);
  const [editingId,setEditingId] = useState<string |null>(null);

  useEffect(()=>{
    loadStats();
    loadExpenses();
  }, []);
   
  const loadStats = async()=>{
    try{
      const data = await getDashboardStats();
      setStats(data);
    } catch(error){
      console.error("Failed to load dashboard",error);
    }
  };
    const loadExpenses = async()=>{
    try{
      const data = await getExpenses();
      setExepenses(data);
    }catch(error){
      console.error(error);
    }
  };
  const handleAddExpense = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      if(editingId){
        await updateExpense(editingId,{
          title,
          amount:Number(amount),
          category,
          notes,
        });
        setEditingId(null);
      }else{
      await createExpense({
        title,
        amount:Number(amount),
        category,
        notes,
      });
     }
      setTitle("");
      setAmount("");
      setCategory("");
      setNotes("");

      await loadStats();
      await loadExpenses();
    }catch(error){
      console.error(error);
    }
  };
  const handleEditExpense = (expense:any)=>{
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setNotes(expense.notes || "");
  };

  const handleDeleteExpense = async(id:string)=>{
    try{
      await deleteExpense(id);
      await loadExpenses();
      await loadStats();
    }catch(error){
      console.error(error);
    }
  };
  const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800"> Welcome Back 👋</h1>
        <p className="text-gray-500 mt-2">
          Here's today's Overview
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Customers" value={stats.totalCustomers} />
        <StatCard title="Active Bookings" value={stats.totalBookings} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow min-h-[420px]">
          <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
          <div className="space-y-3">{stats.latestCustomers.map((customer:any)=>(
          <div key={customer.id} className="py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-900">{customer.name}</p>
            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(customer.createdAt),{ addSuffix: true })}</p> 
          </div>))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow min-h-[420px]">
       <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="space-y-3">{stats.latestBookings.map((booking:any)=>(
          <div key={booking.id} className="py-3 border-b border-gray-100">
          <p className="font-medium">{booking.customer?.name}</p>
          <p className="text-sm text-gray-500">{booking.service?.name}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusStyles[booking.status] || "bg-gray-100 text-gray-800"}`}>
            {booking.status.replace("_", " ")}
            </span>
          </div>))}
        </div>
       </div>

</div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
        <div className="flex justify-between mb-4">
          <span>Revenue</span>
          <span>₹{stats.revenue}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <p className="font-medium mb-2">Expenses</p>
          <div className="flex justify-between">
            <span>Salaries</span>
            <span>₹{stats.salaryCost}</span>
          </div>
          {Object.entries(stats.expenseBreakDown).map(
            ([category,amount])=>(
              <div key={category} className="flex justify-between">
                <span>{category}</span>
                <span>₹{amount}</span>
              </div> 
            )
          )}
        </div>
        <div className="flex justify-between border-t pt-3 mt-3 font-medium">
          <span>Total Expenses</span>
          <span>₹{stats.totalExpenses}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Net Profit</span>
          <span className={stats.netProfit>=0?"text-green-600":"text-red-600"}>₹{stats.netProfit}</span>
        </div>
      </div>
    
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <form onSubmit={handleAddExpense} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}
        className="border p-2 w-full" required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}
        className="border p-2 w-full" required />
        <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}
        className="border p-2 w-full" />
        <input type="text" placeholder="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)}
        className="border p-2 w-full" />
        <button type="submit" className="border p-2 w-full">
          {editingId?"Update Expense": "Add Expense"}
        </button>
      </form>
    </div>

    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4"> Expenses</h2>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Title</th>
            <th className="p-2">category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense)=>(
            <tr key={expense.id} className="border-b">
              <td className="p-2">{expense.title}</td>
              <td className="p-2">{expense.category}</td>
              <td className="p-2">{expense.amount}</td>
              <td className="p-2 flex gap-2">
                <button onClick={()=>handleEditExpense(expense)}
                className="bg-red-600 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={()=>handleDeleteExpense(expense.id)}
                className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
};

export default DashboardPage;