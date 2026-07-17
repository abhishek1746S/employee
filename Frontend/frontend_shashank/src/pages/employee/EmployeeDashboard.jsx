import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: "home", path: "/employee-dashboard" },
    { name: "My Referrals", icon: "network_node", path: "/employee-dashboard/MyReferral" },
    { name: "Shortlist Candidate", icon: "person_add", path: "/employee-dashboard/ShortList" },
    // { name: "Interviews", icon: "frame_person_mic", path: "/employee-dashboard/Interview" },
    { name: "Referrals Issued", icon: "assignment", path: "/employee-dashboard/ReferralIssued" },
    // { name: "Messages", icon: "mail", path: "/employee-dashboard/Messages" },
    { name: "Profile", icon: "manage_accounts", path: "/employee-dashboard/Profile" },
    { name: "Notification", icon: "notifications", path: "/employee-dashboard/Notification" },
    { name: "Settings", icon: "settings", path: "/employee-dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden">

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[70] bg-violet-700 text-white p-3 rounded-xl shadow-lg"
        >
          <FaBars />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen
          bg-gradient-to-b from-violet-700 to-violet-900
          text-white
          flex flex-col
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          lg:static
          lg:flex-shrink-0
        `}
      >

        <div className="flex items-center justify-between px-6 py-6 border-b border-violet-600">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-white text-violet-700 flex items-center justify-center text-2xl font-bold">
              R
            </div>

            <div>
              <h1 className="text-2xl font-bold">ReferralX</h1>
              <p className="text-violet-200 text-sm">
                Employee Portal
              </p>
            </div>

          </div>

          {open && (
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <FaTimes size={22} />
            </button>
          )}

        </div>

        <div className="flex-1 overflow-y-auto py-3">

          {menu.map((item) => (

            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="flex items-center gap-4 mx-4 mt-2 px-4 py-3 rounded-xl hover:bg-violet-600 cursor-pointer transition"
            >

              <span className="material-symbols-outlined">
                {item.icon}
              </span>

              {item.name}

            </div>

          ))}

        </div>

        <div
  onClick={() => {
    // Remove saved login data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    setOpen(false);

    // Redirect to login page
    navigate("/login", { replace: true });
  }}
  className="mx-4 mb-6 flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500 transition cursor-pointer"
>
  <span className="material-symbols-outlined">
    logout
  </span>

  Logout
</div>

      </aside>

      <main className="flex-1 overflow-y-auto lg:ml-0 pt-16 lg:pt-0">

        <Outlet />

      </main>

    </div>
  );
};

export default EmployeeDashboard;