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
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Interviews
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage upcoming and completed interviews.
          </p>

        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition">

          <FaPlus />

          Schedule Interview

        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Today's Interviews
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-3">
              5
            </h2>

            <p className="text-green-500 text-sm mt-2">
              +2 from yesterday
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <FaCalendarAlt
              className="text-violet-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Upcoming
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mt-3">
              12
            </h2>

            <p className="text-blue-500 text-sm mt-2">
              This Week
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

            <FaClock
              className="text-blue-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mt-3">
              18
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Successfully Finished
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaUserTie
              className="text-green-600"
              size={24}
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">

  <table className="w-full">

    <thead className="bg-gray-50">

      <tr>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Candidate
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Role
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Date
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Time
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Mode
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Status
        </th>

      </tr>

    </thead>

    <tbody>

      {interviews.map((item) => (

        <tr
          key={item.id}
          className="border-b hover:bg-violet-50 transition-all duration-300"
        >

          <td className="px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">

                <FaUserTie className="text-violet-600" />

              </div>

              <div>

                <h2 className="font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Candidate
                </p>

              </div>

            </div>

          </td>

          <td className="px-6 py-5">

            <span className="font-medium">
              {item.role}
            </span>

          </td>

          <td className="px-6 py-5">

            <div className="flex items-center gap-2">

              <FaCalendarAlt className="text-violet-600" />

              {item.date}

            </div>

          </td>

          <td className="px-6 py-5">

            <div className="flex items-center gap-2">

              <FaClock className="text-green-600" />

              {item.time}

            </div>

          </td>

          <td className="px-6 py-5">

            <div className="flex items-center gap-2">

              <FaVideo className="text-blue-600" />

              {item.mode}

            </div>

          </td>

          <td className="px-6 py-5">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
<div className="lg:hidden p-4 space-y-4">

  {interviews.map((item) => (

    <div
      key={item.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300"
    >

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">

          <FaUserTie className="text-violet-600 text-lg" />

        </div>

        <div className="flex-1">

          <h2 className="font-semibold text-gray-800">
            {item.name}
          </h2>

          <p className="text-sm text-gray-500">
            {item.role}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3 text-sm text-gray-600">

          <FaCalendarAlt className="text-violet-600" />

          <span>{item.date}</span>

        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">

          <FaClock className="text-green-600" />

          <span>{item.time}</span>

        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">

          <FaVideo className="text-blue-600" />

          <span>{item.mode}</span>

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            item.status === "Scheduled"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {item.status}
        </span>

        <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">

          View

        </button>

      </div>

    </div>

  ))}

</div>

</div>

</div>

  );
};

export default Interview;