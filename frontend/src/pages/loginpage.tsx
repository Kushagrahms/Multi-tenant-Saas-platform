import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../api/auth";
import {useAuth} from "../context/authContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e:React.FormEvent)=>{
    e.preventDefault();

    try{
      const data = await loginUser({email,password});

      login(data.token);
      navigate("/dashboard");
    } catch(err){
      console.error(err);
    
    alert("Login failed");
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-orange-50">
    <form onSubmit={handleLogin}
    className="bg-white p-8 rounded-2xl shadow-lg w-[350px] flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center text-orange-500">Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
      className="border p-3 rounded-lg outline-none"/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
      className="border p-3 rounded-lg outline-none"/>

      <button type="submit"  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg transition">
        Login
      </button>
      <p className="text-center text-sm text-gray-600">
        Don't have an Account?{" "}
        <span onClick={()=>navigate("/register")}
        className="text-orange-500 font-semibold cursor-pointer">
          Register
        </span>
      </p>
    </form>
  </div>
);
};
export default LoginPage;