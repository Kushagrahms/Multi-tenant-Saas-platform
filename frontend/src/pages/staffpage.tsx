import {useEffect,useState} from "react";
import {createStaff, getStaff} from "../api/users";

const StaffPage = () => {
  const [staff,setStaff] = useState<any[]>([]);
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("STAFF");

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
      await createStaff({
        name,
        email,
        password,
        role,
      });
      setName("");
      setEmail("");
      setPassword("");
      setRole("STAFF");

      fetchStaff();
    }catch(error){
      console.error(error);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Satff</h1>
      <form onSubmit={handleCreateStaff} className="space-y-4 border p-4 rounded-lg mb-8">
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
        className="border p-2 w-full" required />
        <input type="email" placeholder={email} onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full" required />
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full" required />
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="border p-2 w-full">
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add staff
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
        {staff.map((member) => (
  <tr key={member.id} className="border-b">
    <td className="p-2">{member.name}</td>
    <td className="p-2">{member.email}</td>
    <td className="p-2">{member.role}</td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  ) 
};

export default StaffPage;