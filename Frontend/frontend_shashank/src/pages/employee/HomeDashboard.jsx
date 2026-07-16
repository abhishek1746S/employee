import React from "react";
import {
  FaUserFriends,
  FaClipboardList,
  FaUserCheck,
  FaPaperPlane,
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const stats = [
  {
    title: "Active Referrals",
    value: 120,
    icon: (
      <FaClipboardList
        size={28}
        className="text-violet-600"
      />
    ),
  },
  {
    title: "Total Applicants",
    value: 15,
    icon: (
      <FaUserFriends
        size={28}
        className="text-blue-600"
      />
    ),
  },
  {
    title: "Shortlisted",
    value: 5,
    icon: (
      <FaUserCheck
        size={28}
        className="text-green-600"
      />
    ),
  },
  {
    title: "Referral Issued",
    value: 8,
    icon: (
      <FaPaperPlane
        size={28}
        className="text-orange-500"
      />
    ),
  },
];

const chartData = [
  { month: "Mar 5", value: 5 },
  { month: "Mar 12", value: 15 },
  { month: "Mar 19", value: 12 },
  { month: "Mar 26", value: 35 },
  { month: "Jun 2", value: 28 },
  { month: "Jun 9", value: 40 },
];

const applicants = [
  {
    name: "Ananya Singh",
    role: "SDE Intern",
    time: "2h ago",
    status: "Under Review",
  },
  {
    name: "Rohit Verma",
    role: "Backend Developer",
    time: "5h ago",
    status: "Shortlisted",
  },
  {
    name: "Meera Patel",
    role: "Frontend Developer",
    time: "1 day ago",
    status: "Under Review",
  },
];

const referrals = [
  {
    job: "SDE Intern",
    applicants: 12,
  },
  {
    job: "Backend Developer",
    applicants: 8,
  },
  {
    job: "Frontend Developer",
    applicants: 6,
  },
];

export default function HomeDashboard() {
  return (
    <div className="bg-[#F8F9FC] min-h-screen p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm px-5 py-5 lg:px-8 lg:py-6 flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Welcome back, Rahul 👋
          </p>

        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full xl:w-auto">

          <div className="relative flex-1 xl:w-80">

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600"
            />

          </div>

          <div className="flex items-center justify-between md:justify-start gap-5">

            <button className="relative">

              <FaBell className="text-2xl text-gray-600 hover:text-violet-600 transition" />

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

            </button>

            <div className="flex items-center gap-3 cursor-pointer">

              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                alt=""
                className="w-11 h-11 rounded-full object-cover"
              />

              <div className="hidden sm:block">

                <h2 className="font-semibold">
                  Rahul Sharma
                </h2>

                <p className="text-sm text-gray-500">
                  Employee
                </p>

              </div>

              <FaChevronDown className="text-gray-500" />

            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center min-h-[140px]"
          >

            <div>

              <h2 className="text-gray-500 text-sm font-medium">
                {item.title}
              </h2>

              <h1 className="text-3xl lg:text-4xl font-bold mt-3">
                {item.value}
              </h1>

              <p className="text-green-500 text-sm mt-2">
                ↑ 12% this month
              </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">

              {item.icon}

            </div>

          </div>

        ))}

      </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            <h2 className="text-lg sm:text-xl font-bold">
              Applications Overview
            </h2>

            <button className="px-4 py-2 rounded-lg bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition">
              Last 6 Months
            </button>

          </div>

          <div className="w-full h-[260px] sm:h-[320px] lg:h-[360px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="5 5"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 6px 18px rgba(0,0,0,.12)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6D28D9"
                  strokeWidth={4}
                  dot={{
                    r: 5,
                  }}
                  activeDot={{
                    r: 8,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">

            <h2 className="text-lg font-bold mb-5">
              Top Referrals
            </h2>

            <div className="space-y-4">

              {referrals.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
                >

                  <div>

                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.job}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400">
                      Referral Post
                    </p>

                  </div>

                  <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">

                    <span className="font-bold text-violet-700">
                      {item.applicants}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">

            <h2 className="text-lg font-bold mb-5">
              Referral Conversion
            </h2>

            <div className="w-32 sm:w-40 mx-auto">

              <CircularProgressbar
                value={25}
                text="25%"
                strokeWidth={10}
              />

            </div>

            <div className="text-center mt-6">

              <h3 className="font-bold text-lg">
                Good Progress
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                8 referrals completed
              </p>

            </div>

          </div>

        </div>

      </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-5 sm:p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-lg sm:text-xl font-bold">
            Recent Applicants
          </h2>

          <button className="text-violet-600 font-medium hover:text-violet-700">
            View All
          </button>

        </div>

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 text-left">

                <th className="px-5 py-4 rounded-l-xl">
                  Candidate
                </th>

                <th className="px-5 py-4">
                  Role
                </th>

                <th className="px-5 py-4">
                  Applied
                </th>

                <th className="px-5 py-4 rounded-r-xl">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {applicants.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700">

                        {item.name.charAt(0)}

                      </div>

                      <span className="font-medium">
                        {item.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-5">
                    {item.role}
                  </td>

                  <td className="px-5 py-5">
                    {item.time}
                  </td>

                  <td className="px-5 py-5">

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="grid gap-4 lg:hidden">

          {applicants.map((item, index) => (

            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm"
            >

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

              <div className="flex justify-between items-center mt-4">

                <span className="text-gray-500 text-sm">

                  {item.time}

                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                  {item.status}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}