import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Referrals from "./pages/Referrals.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard.jsx";
import HomeDashboard from "./pages/employee/HomeDashboard.jsx"
import Interview from "./pages/employee/Interview.jsx"
import Messages from "./pages/employee/Message.jsx"
import MyReferral from "./pages/employee/myReferral.jsx"
import Notification from "./pages/employee/Notification.jsx"
import Profiles from "./pages/employee/Profile.jsx"
import ReferralsIssued from "./pages/employee/ReferralsIssued.jsx"
import Setting from "./pages/employee/Settings.jsx"
import ShortList from "./pages/employee/shortList.jsx"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/referrals" element={<Referrals />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Student Dashboard */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Dashboard */}
     <Route
  path="/employee-dashboard"
  element={
    <ProtectedRoute allowedRoles={["employee"]}>
      <EmployeeDashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<HomeDashboard />} />
  <Route path="Interview" element={<Interview />} />
  <Route path="Messages" element={<Messages />} />
  <Route path="MyReferral" element={<MyReferral />} />
  <Route path="Notification" element={<Notification />} />
  <Route path="Profile" element={<Profiles />} />
  <Route path="ReferralIssued" element={<ReferralsIssued />} />
  <Route path="ShortList" element={<ShortList />} />
  <Route path="settings" element={<Setting />} />
</Route>

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
