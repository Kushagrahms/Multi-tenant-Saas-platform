import {  Outlet} from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const DashboardLayout = () =>{
    return (
        <div style = {{display:"flex",minHeight:"100vh",background:"#FFF8F3",}}>
            <Sidebar />
            <div style = {{flex:1,display:"flex",flexDirection:"column",}}>
                <Navbar />
                <main style = {{padding:"24px", flex:1,}}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;

