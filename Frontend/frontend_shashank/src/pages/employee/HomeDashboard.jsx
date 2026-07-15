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
    icon: <FaClipboardList size={28} className="text-violet-600" />,
  },
  {
    title: "Total Applicants",
    value: 15,
    icon: <FaUserFriends size={28} className="text-blue-600" />,
  },
  {
    title: "Shortlisted",
    value: 5,
    icon: <FaUserCheck size={28} className="text-green-600" />,
  },
  {
    title: "Referral Issued",
    value: 8,
    icon: <FaPaperPlane size={28} className="text-orange-500" />,
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
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}

      <div className="bg-white rounded-xl shadow-sm px-8 py-4 flex justify-between items-center mb-6">

  <div>

    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Welcome back, Rahul 👋
    </p>

  </div>

  <div className="flex items-center gap-6">

    <div className="relative">

      <FaSearch className="absolute left-3 top-3 text-gray-400" />

      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
      />

    </div>

    <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-violet-600"/>

    <div className="flex items-center gap-3">

      <img
        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379005.jpg&fm=jpg"
        className="w-11 h-11 rounded-full"
      />

      <div>

        <h2 className="font-semibold">
          Rahul Sharma
        </h2>

        <p className="text-sm text-gray-500">
          Employee
        </p>

      </div>

      <FaChevronDown/>

    </div>

  </div>

</div>

      {/* Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex justify-between items-center cursor-pointer"
          >

            <div>

              <h2 className="text-gray-500 text-sm font-medium">
                {item.title}
              </h2>

              <h1 className="text-4xl font-bold mt-3 text-gray-800">
                {item.value}
              </h1>

              <p className="text-green-500 text-sm mt-2">
↑ 12% this month
</p>

            </div>

            {item.icon}

          </div>

        ))}

      </div>

      {/* Chart + Right */}

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-6">

        {/* Chart */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <h2 className="font-bold text-xl mb-5">
            Applications Overview
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={chartData}>

              <CartesianGrid
stroke="#E5E7EB"
strokeDasharray="5 5"
/>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
contentStyle={{
borderRadius:"10px",
border:"none",
boxShadow:"0 0 10px rgba(0,0,0,.1)"
}}
/>

              <Line
type="monotone"
dataKey="value"
stroke="#6D28D9"
strokeWidth={4}
dot={{ r: 5 }}
activeDot={{ r: 8 }}
/>

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Right Side */}

        <div className="space-y-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <h2 className="font-bold text-lg mb-4">
              Top Referrals
            </h2>

            {referrals.map((item, index) => (

              <div
                key={index}
                className="flex justify-between py-2 border-b"
              >

                <div>

<h2 className="font-semibold">
{item.job}
</h2>

<p className="text-gray-400 text-sm">
Referral Post
</p>

</div>

                <span className="text-violet-600 font-bold">
{item.applicants}
</span>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <h2 className="font-bold text-lg mb-4">
              Referral Conversion
            </h2>

            <div className="w-40 mx-auto">

              <CircularProgressbar
value={25}
text="25%"
strokeWidth={10}
/>

            </div>

            <div className="text-center mt-5">

<h2 className="font-bold text-lg">
Good Progress
</h2>

<p className="text-gray-500 text-sm">
8 referrals completed
</p>

</div>

          </div>

        </div>

      </div>

      {/* Applicants */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 p-6">

        <h2 className="text-xl font-bold mb-5">

          Recent Applicants

        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50 text-left h-14">

              <th className="py-4 px-3">
Name
</th>

              <th>Role</th>

              <th>Time</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {applicants.map((item, index) => (

              <tr
key={index}
className="border-b h-16 hover:bg-gray-50 transition-all duration-300"
>

                <td>{item.name}</td>

                <td>{item.role}</td>

                <td>{item.time}</td>

                <td>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

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
}
