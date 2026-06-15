import {useEffect,useState} from "react";
import {createStaff, getStaff, deleteStaff,updateStaff} from "../api/users";

const StaffPage = () => {
  const [staff,setStaff] = useState<any[]>([]);
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("STAFF");
  const [editingId,setEditingId] = useState<string |null>(null);

  const fetchStaff=async()=>{
    try{
      const data = await getStaff();
      setStaff(data);
    }catch(error){
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchStaff();
  },[]);
  const handleCreateStaff = async(
    e:React.FormEvent<HTMLFormElement>
  )=>{
    e.preventDefault();

    try{
      if(editingId){
        await updateStaff(editingId,{
          name,email,role,
        });
        setEditingId(null);
      }else{
     await createStaff({
        name,
        email,
        password,
        role,
      });
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("STAFF");

      fetchStaff();
    }catch(error){
      console.error(error);
    }
  };
  const handleDeleteStaff = async(id:string)=>{
    try{
      await deleteStaff(id);
      setStaff((prev)=>
      prev.filter((member)=>member.id !== id));
    }catch(error){
      console.error(error);
    }
  };
  const handleUpdateStaff = async(member:any)=>{
    setEditingId(member.id);
    setName(member.name);
    setEmail(member.email);
    setRole(member.role);
    setPassword("");
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Satff</h1>
      <form onSubmit={handleCreateStaff} className="space-y-4 border p-4 rounded-lg mb-8">
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
        className="border p-2 w-full" required />
        <input type="email" value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full" required />
        <input type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full" required={!editingId} />
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="border p-2 w-full">
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingId?"Update Staff":"Add Staff"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {staff.map((member) => (
  <tr key={member.id} className="border-b">
    <td className="p-2">{member.name}</td>
    <td className="p-2">{member.email}</td>
    <td className="p-2">{member.role}</td>
    <td className="p-2 flex gap-2">
      <button onClick={()=>handleUpdateStaff(member)}
      className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
      <button onClick={()=>handleDeleteStaff(member.id)}
      className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  ) 
};

export default StaffPage;