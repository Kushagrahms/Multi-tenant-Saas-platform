import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "../pages/loginpage";
import RegisterPage from "../pages/registerpage";
import DashboardPage from "../pages/dashboardpage";
import CustomerPage from "../pages/customer";
import BookingsPage from "../pages/bookings";
import InvoicePage from "../pages/invoice";
import StaffPage from "../pages/staffpage";
import ServicePage from "../pages/services";

import ProtectedRoute from "./ProtectedRoutes";
import DashboardLayout from "../layouts/dahsboardLayouts";

const AppRoutes = () =>{
    return(
        <Routes>
            {/*public routes:*/}
            <Route path = "/" element={<Navigate to="/login"/>} />
            <Route path = "/login" element={<LoginPage/>} />
            <Route path = "/register" element={<RegisterPage/>} />
            {/* protected routes:*/}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
 

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/services" element={<ServicePage />} />
          </Route>
        </Routes>
    );
};
export default AppRoutes;

