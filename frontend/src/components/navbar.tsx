import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () =>{
    const {logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () =>{
        logout();
        navigate("/login");
    };
    return (
        <header style = {{
            height:"77px",
            background:"#FFFFFF", 
            borderBottom:"1px solid #eee", 
            padding:"0 24px", 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"flex-end",
        }}>
           
        </header>
    );
};
export default Navbar;
