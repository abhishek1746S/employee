import React from "react";
import {
  FaBell,
  FaCheckCircle,
  FaClipboardList,
  FaUserPlus,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "New Application",
    message: "Ananya Singh applied for Frontend Developer.",
    time: "2 min ago",
    icon: <FaUserPlus className="text-blue-600" />,
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Candidate Shortlisted",
    message: "Rohit Verma has been shortlisted successfully.",
    time: "1 hour ago",
    icon: <FaCheckCircle className="text-green-600" />,
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Referral Created",
    message: "Backend Developer referral has been published.",
    time: "Yesterday",
    icon: <FaClipboardList className="text-violet-600" />,
    color: "bg-violet-100",
  },
];

const Notification = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Stay updated with your latest activities.
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
            >

              <span className="text-xl">

                {item.icon}

              </span>

            </div>

            <div className="flex-1">

              <h2 className="text-lg font-semibold">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {item.message}
              </p>

            </div>

            <div className="text-gray-400 text-sm whitespace-nowrap">

              {item.time}

            </div>

          </div>

        ))}

      </div>

      {notifications.length === 0 && (

        <div className="bg-white rounded-2xl shadow-sm p-10 mt-6 flex flex-col items-center justify-center">

          <FaBell className="text-6xl text-gray-300 mb-4" />

          <h2 className="text-xl font-semibold">
            No Notifications
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            You're all caught up. New notifications will appear here.
          </p>

        </div>

      )}

    </div>
  );
};

export default Notification;