import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaUserTie,
  FaPlus,
} from "react-icons/fa";

const interviews = [
  {
    id: 1,
    name: "Ananya Singh",
    role: "Frontend Developer",
    date: "28 Jun 2026",
    time: "10:00 AM",
    mode: "Google Meet",
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Rohit Verma",
    role: "Backend Developer",
    date: "28 Jun 2026",
    time: "2:30 PM",
    mode: "Zoom",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Software Engineer",
    date: "29 Jun 2026",
    time: "11:30 AM",
    mode: "Offline",
    status: "Completed",
  },
];

const Interview = () => {
  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Interviews
          </h1>

          <p className="text-gray-500">
            Manage upcoming and completed interviews.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-xl hover:bg-violet-700">
          <FaPlus />
          Schedule Interview
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Today's Interviews</p>
          <h2 className="text-4xl font-bold mt-2">5</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Upcoming</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-2">12</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">18</h2>
        </div>

      </div>

      {/* Interview Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Candidate</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Mode</th>
              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {interviews.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">

                      <FaUserTie className="text-violet-600" />

                    </div>

                    {item.name}

                  </div>

                </td>

                <td className="p-4">
                  {item.role}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <FaCalendarAlt className="text-violet-600"/>

                    {item.date}

                  </div>

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <FaClock className="text-green-600"/>

                    {item.time}

                  </div>

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <FaVideo className="text-blue-600"/>

                    {item.mode}

                  </div>

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "Scheduled"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Interview;