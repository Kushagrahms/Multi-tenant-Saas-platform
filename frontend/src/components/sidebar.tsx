import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Sidebar = () =>{
    const links = [
        { name : "Dashboard", path: "/dashboard"},
        { name : "Customers", path: "/customer"},
        { name : "Bookings", path: "/bookings"},
        { name : "Invoice", path: "/invoices"},
        { name : "Staff", path: "/staff"},
        {name  : "Services", path:"/services"}
    ];
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
          logout();
          navigate("/login");
        };
    return (
        <aside style={{
               width:"240px",
               background:"#FFF1E6",
               minHeight:"100vh",
               padding:"24px",
               borderRight:"1px solid #f3d8c4",
               display:"flex",
               flexDirection:"column",
            }}
>
            <h2 style = {{marginBottom:"40px",}}>
                SAAS CRM 
            </h2>
            <nav style={{
                 display:"flex",
                 flexDirection:"column",
                 gap:"12px",
                 flex:1,
                 }}>
                {links.map((link)=>(
                    <NavLink key={link.path} to={link.path} style={({isActive})=>({
                        textDecoration:"none",padding:"12px", borderRadius:"12px",color:"#333",background:isActive ? "#FFD6BA" : "transparent",
                        fontWeight:isActive ? "600" : "400",
                    })}>
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <button onClick={handleLogout} style={{
             padding:"12px",
             borderRadius:"12px",
             border:"none",
             cursor:"pointer",
             background:"#FFD6BA",
            fontWeight:"600",
            }}> Logout </button>
        </aside>
    );
};
export default Sidebar;

