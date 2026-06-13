import {useEffect, useState} from "react";
import StatCard from "../components/statcard";
import {getDashboardStats} from "../api/dashboard";

type DashboardStats = {
  totalCustomers:number;
  totalBookings:number;
  totalInvoices:number;
};

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers:0,
    totalBookings:0,
    totalInvoices:0,
  });

  useEffect(()=>{
    loadStats();
  }, []);
   
  const loadStats = async()=>{
    try{
      const data = await getDashboardStats();
      setStats(data);
    } catch(error){
      console.error("Failed to load dashboard",error);
    }
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
        <StatCard title="Bookings" value={stats.totalBookings} />
        <StatCard title="Invoices" value={stats.totalInvoices} />

      </div>
    </div>
  )
};

export default DashboardPage;