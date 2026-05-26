import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

export default function RegisterPage(){
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    tenantName: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  };
  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
    try{
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/auth/register",{
        method: "POST",
        headers:{
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || "Registration failed");
      }
      navigate("/login");
    }catch(err:any){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-orange-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
        Create Account
      </h1>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
          {error}
          </div>
      )}
      <form onSubmit={handleSubmit} className = "space-y-4">
        <input type="text" name="tenantName" placeholder="Business Name" value={formData.tenantName} onChange={handleChange} 
        className="w-full border p-3 rounded-xl" required />

        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} 
        className="w-full border p-3 rounded-xl" required />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} 
        className="w-full border p-3 rounded-xl" required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} 
        className="w-full border p-3 rounded-xl" required />

        <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
          {loading ? "Creating.." :"Register"}
        </button>    
      </form>

      <p className="text-center mt-5 text-gray-600">
        Already have an Account?{" "}
        <Link to="/login" className="text-orange-600 font-semibold">
        Login</Link>
      </p>
    </div>
  </div>
);
}

