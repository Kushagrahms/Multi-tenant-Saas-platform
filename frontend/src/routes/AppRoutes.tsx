import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "../pages/loginpage";
import RegisterPage from "../pages/registerpage";
import DashboardPage from "../pages/dashboardpage";
import CustomerPage from "../pages/customer";
import BookingsPage from "../pages/bookings";
import InvoicePage from "../pages/invoice";
import StaffPage from "../pages/staffpage";

import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () =>{
    return(
        <Routes>
            {/*public routes:*/}
            <Route path = "/login" element={<LoginPage/>} />
            <Route path = "/register" element={<RegisterPage/>} />
            {/* protected routes:*/}

            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/customer" element={<ProtectedRoute><CustomerPage /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
            <Route path="/invoices" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />

            {/* default routes:*/}
            <Route path = "*" element={<Navigate to="/login"/>} />
        </Routes>
    );
};
export default AppRoutes;

