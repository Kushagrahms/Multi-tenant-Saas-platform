import { useEffect,useState } from "react";
import { createService,updateService,getServices,deleteService } from "../api/service";
interface Service{
    id:string;
    name:string;
    price:number;
    duration: number;
    status: string;
}

const ServicePage = ()=>{
    const[services,setServices] = useState<Service[]>([]);
    const [form,setForm] = useState({
        name:"",
        price:"",
        duration:"",
        status:"ACTIVE",
    });
    const [editingId,setEditingId] = useState<string | null>(null);
    const fetchService = async()=>{
        try{
            const data = await getServices();
            setServices(data);
        }catch(error){
            console.error(error);
        }
    };
    useEffect(()=>{
        fetchService();
    },[]);

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const payload = {
                name:form.name,
                price:Number(form.price),
                duration: Number(form.duration),
                status: form.status,
            };
            if(editingId){
                await updateService(editingId,payload);
                setEditingId(null);
            }else{
                await createService(payload);
            }
            setForm({
                name:"",
                price:"",
                duration: "",
                status: "ACTIVE",
            });
            fetchService();
        }catch(error){
            console.error(error);
        }
    };

    const handleDelete = async(id:string)=>{
        try{
            await deleteService(id);
            setServices((prev)=>prev.filter((service)=>service.id!==id));
        }catch(error){
            console.error(error);
        }
    };
    const handleEdit = async(service:Service)=>{
        setEditingId(service.id);
        setForm({
            name:service.name,
            price:service.price.toString(),
            duration: service.duration.toString(),
            status: service.status,
        });
    };
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Service
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
                <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="Service name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}
                    className="border p-2 rounded" />
                    <input type="number" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}
                    className="border p-2 rounded" />
                    <input type="number" placeholder="Duration (minutes)" value={form.duration} onChange={(e)=>setForm({...form,duration: e.target.value,})}
                    className="border p-2 rounded" />
                    <select value={form.status} onChange={(e)=>setForm({...form,status: e.target.value,})}
                    className="border p-2 rounded">
                      <option value="ACTIVE">ACTIVE</option>
                     <option value="INACTIVE">INACTIVE</option>
                       </select>
                </div>
                <button type="submit"  className="mt-4 px-4 py-2 bg-black text-white rounded">{editingId?"Update Service":"Add Service"}</button>
            </form>
            <div className="bg-white rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Price</th>
                            <th className="text-left p-3">Duration</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service)=>(
                            <tr key={service.id} className="border-b">
                                <td className="p-3">{service.name}</td>
                                <td className="p-3">{service.price}</td>
                                <td className="p-3">{service.duration} min</td>
                                <td className="p-3">
                                     <span className={`px-2 py-1 rounded text-sm ${service.status === "ACTIVE"
                                      ? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}`}>{service.status}</span></td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={()=>handleEdit(service)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={()=>handleDelete(service.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicePage;
