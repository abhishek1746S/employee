import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F8F9FC]">

      <div className="ml-auto  flex gap-5 text-[500px]"></div>

      {/* Sidebar */}
      <div className="w-72 h-screen shrink-0 bg-gradient-to-b from-violet-700 to-violet-900 text-white shadow-2xl flex flex-col">
        <div className="flex items-center gap-3 px-6 py-8 border-b border-violet-600">

  <div className="w-12 h-12 rounded-xl bg-white text-violet-700 flex items-center justify-center text-2xl font-bold">
    R
  </div>

  <div>

    <h1 className="text-2xl font-bold">
      ReferralX
    </h1>

    <p className="text-violet-200 text-sm">
      Employee Portal
    </p>

  </div>

</div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard")}
        >
          <span className="material-symbols-outlined">home</span>
          Dashboard
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/MyReferral")}
        >
          <span className="material-symbols-outlined">network_node</span>
          My Referrals
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/ShortList")}
        >
          <span className="material-symbols-outlined">person_add</span>
          Shortlist Candidate
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/Interview")}
        >
          <span className="material-symbols-outlined">frame_person_mic</span>
          Interviews
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/ReferralIssued")}
        >
          <span className="material-symbols-outlined">assignment</span>
          Referrals Issued
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/Messages")}
        >
          <span className="material-symbols-outlined">assignment</span>
          Messages
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/Profile")}
        >
          <span className="material-symbols-outlined">manage_accounts</span>
          Profile
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/Notification")}
        >
          <span className="material-symbols-outlined">notifications</span>
          Notification
        </div>

        <div
          className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/employee-dashboard/settings")}
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </div>

        <div
  onClick={() => navigate("/")}
  className="mt-auto mb-6 mx-4 flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500 transition-all cursor-pointer"
>

  <span className="material-symbols-outlined">
    logout
  </span>

  Logout

</div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto">
  <Outlet />
</div>
        
      </div>
    
  );
};

export default EmployeeDashboard;
