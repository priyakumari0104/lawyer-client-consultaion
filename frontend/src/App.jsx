import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/register";
import Login from "./pages/login";
import LandingPage from "./pages/LandingPage";
import RoleSelect from "./pages/RoleSelect";
import Clientdashboard from "./client/ClientDashboard";
import Notifications from "./client/Notifications";
import Profile from "./client/Profile";
import FindLawyers from "./client/findLawyers";
import Documents from "./client/Documents";
import LawyerDashboard from "./lawyer/lawyerDashboard";
import ClientRequests from "./lawyer/clientRequests";
import LawyerAppointments from "./lawyer/lawyerAppoinments";
import LawyerProfile from "./lawyer/lawyerProfile";
import VerificationStatus from "./lawyer/verificationStatus";
import AdminDashboard from "./admin/adminDashboard";
import ManageUsers from "./admin/manageUsers";
import VerifyLawyers from "./admin/verifyLawyers";
import Reports from "./admin/reports";
import BookAppointment from "./client/BookAppoinments";
import Myappointments from "./client/myAppointments";
import Chat from "./pages/Chatbox";

import { useEffect } from "react";
function App() {
  return (
   <BrowserRouter>

  <Routes>

    {/* PUBLIC ROUTES */}

    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/role-select"
      element={<RoleSelect />}
    />
    <Route
  path="/chat/:appointmentId"
  element={<Chat />}
/>

    {/* CLIENT ROUTES */}

    <Route
      path="/client/dashboard"
      element={
        <ProtectedRoute>
          <Clientdashboard/>
        </ProtectedRoute>
      }
    />

    <Route
      path="/client/profile"
      element={<Profile />}
    />
<Route
      path="/client/appointments"
      element={<Myappointments />}
    />
    

    <Route
      path="/client/notifications"
      element={<Notifications />}
    />

    <Route
      path="/client/find-lawyers"
      element={<FindLawyers />}
    />
    <Route
      path="/client/documents"
      element={<Documents />}
    />
    <Route
    path="/client/book-appointment/:lawyerId"
    element={<BookAppointment/>}
    />
    
// lawyer routes

<Route
      path="/lawyer/dashboard"
      element={
        <ProtectedRoute role="lawyer">
          <LawyerDashboard/>
        </ProtectedRoute>
      }
    />

  <Route
      path="/lawyer/requests"
      element={<ClientRequests />}
    />
<Route
      path="/lawyer/appoinments"
      element={<LawyerAppointments />}
    />
<Route
      path="/lawyer/profile"
      element={<LawyerProfile />}
    />
<Route
      path="/lawyer/status"
      element={<VerificationStatus />}
    />
  // admin
<Route path="/admin/dashboard"
element={
  <ProtectedRoute role="admin">
    <AdminDashboard/>
  </ProtectedRoute>
}
/>
<Route
      path="/admin/reports"
      element={<Reports />}
    />
<Route
      path="/admin/verifylawyer"
      element={<VerifyLawyers />}
    />    
<Route
      path="/admin/manageusers"
      element={<ManageUsers/>}
    />    
  </Routes>

</BrowserRouter>
  );
}

export default App;