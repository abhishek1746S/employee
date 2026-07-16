import React, { useEffect, useState } from "react";
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

import {
  getDashboard,
} from "../../services/referralService.js";

import {
  getProfile,
} from "../../services/profileService.js";

const chartData = [
  { month: "Mar 5", value: 5 },
  { month: "Mar 12", value: 15 },
  { month: "Mar 19", value: 12 },
  { month: "Mar 26", value: 35 },
  { month: "Jun 2", value: 28 },
  { month: "Jun 9", value: 40 },
];


export default function HomeDashboard() {
  const savedProfile = localStorage.getItem(
  "employeeProfile"
);
  const [dashboard, setDashboard] = useState({
    total_referrals: 0,
    active_referrals: 0,
    total_applicants: 0,
    shortlisted: 0,
    referred: 0,
    under_review: 0,
    recent_applications: [],
  });

 const [profile, setProfile] = useState(
  savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "",
        designation: "",
        company_name: "",
        profile_pic: "",
      }
);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        name: data.name || "",
        designation: data.designation || "",
        company_name: data.company_name || "",
        profile_pic: data.profile_pic || "",
      });
      localStorage.setItem(
  "employeeProfile",
  JSON.stringify(data)
);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      await Promise.all([
        loadDashboard(),
        loadProfile(),
      ]);

      setLoading(false);

    };

    loadData();

  }, []);

  const stats = [
    {
      title: "Active Referrals",
      value: dashboard.active_referrals,
      icon: (
        <FaClipboardList
          size={28}
          className="text-violet-600"
        />
      ),
    },
        {
      title: "Total Applicants",
      value: dashboard.total_applicants,
      icon: (
        <FaUserFriends
          size={28}
          className="text-blue-600"
        />
      ),
    },
    {
      title: "Shortlisted",
      value: dashboard.shortlisted,
      icon: (
        <FaUserCheck
          size={28}
          className="text-green-600"
        />
      ),
    },
    {
      title: "Referral Issued",
      value: dashboard.referred,
      icon: (
        <FaPaperPlane
          size={28}
          className="text-orange-500"
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (

    <div className="bg-[#F8F9FC] h-screen overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-hide">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-sm p-4 md:px-8 md:py-5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6">

        {/* Left */}

        <div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Welcome Back 👋
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto">

          {/* Search */}

          <div className="relative w-full sm:w-72">

            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
            />

          </div>

          {/* User */}

          <div className="flex items-center justify-between sm:justify-start gap-4">

            <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-violet-600" />

            <div className="flex items-center gap-3">

              <img
                src={
                  profile.profile_pic ||
                  "https://i.pravatar.cc/200?img=12"
                }
                alt="Profile"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
              />

              <div className="hidden sm:block">

                <h2 className="font-semibold">
                  {profile.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {profile.designation || "Employee"}
                </p>

              </div>

              <FaChevronDown />

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}
            {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 md:p-6 flex justify-between items-center"
          >

            <div>

              <h2 className="text-gray-500 text-sm font-medium">
                {item.title}
              </h2>

              <h1 className="text-3xl md:text-4xl font-bold mt-3 text-gray-800">
                {item.value}
              </h1>

              <p className="text-green-500 text-sm mt-2">
                Live Data
              </p>

            </div>

            {item.icon}

          </div>

        ))}

      </div>


      {/* Chart + Summary */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

        {/* Chart */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">

          <h2 className="font-bold text-lg md:text-xl mb-5">
            Applications Overview
          </h2>

          <div className="w-full h-[250px] md:h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={chartData}>

                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="5 5"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 0 10px rgba(0,0,0,.1)",
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

        </div>


        {/* Right Side */}

        <div className="space-y-5"> 
                    {/* Dashboard Summary */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">

            <h2 className="font-bold text-lg mb-4">
              Dashboard Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Total Referrals</span>

                <span className="font-bold text-violet-600">
                  {dashboard.total_referrals}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Active Referrals</span>

                <span className="font-bold text-green-600">
                  {dashboard.active_referrals}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Total Applicants</span>

                <span className="font-bold text-blue-600">
                  {dashboard.total_applicants}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Shortlisted</span>

                <span className="font-bold text-orange-600">
                  {dashboard.shortlisted}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Referral Issued</span>

                <span className="font-bold text-purple-600">
                  {dashboard.referred}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Under Review</span>

                <span className="font-bold text-yellow-600">
                  {dashboard.under_review}
                </span>

              </div>

            </div>

          </div>


          {/* Referral Conversion */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">

            <h2 className="font-bold text-lg mb-4">
              Referral Conversion
            </h2>

            <div className="w-36 mx-auto">

              <CircularProgressbar
                value={
                  dashboard.total_applicants === 0
                    ? 0
                    : Math.round(
                        (dashboard.shortlisted /
                          dashboard.total_applicants) *
                          100
                      )
                }
                text={`${
                  dashboard.total_applicants === 0
                    ? 0
                    : Math.round(
                        (dashboard.shortlisted /
                          dashboard.total_applicants) *
                          100
                      )
                }%`}
                strokeWidth={10}
              />

            </div>

            <div className="text-center mt-5">

              <h2 className="font-bold text-lg">
                Live Conversion
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {dashboard.shortlisted} shortlisted from{" "}
                {dashboard.total_applicants} applicants
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Recent Applicants */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 p-4 md:p-6">

        <h2 className="text-lg md:text-xl font-bold mb-5">
          Recent Applicants
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-[650px] w-full">

            <thead>

              <tr className="bg-gray-50 text-left h-14">

                <th className="py-4 px-3">
                  Student ID
                </th>

                <th>
                  Application ID
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recent_applications.length > 0 ? (

                dashboard.recent_applications.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b h-16 hover:bg-gray-50 transition-all duration-300"
                  >

                    <td className="px-3 font-medium">
                      #{item.student_id}
                    </td>

                    <td>
                      #{item.application_id}
                    </td>

                    <td>

                      <span
                        className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold
                        ${
                          item.status === "shortlisted"
                            ? "bg-green-100 text-green-700"
                            : item.status === "under_review"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "referred"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >

                        {item.status}

                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={3}
                    className="text-center py-10 text-gray-500"
                  >
                    No recent applications found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}
