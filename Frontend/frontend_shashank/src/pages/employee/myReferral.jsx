import React, { useState } from "react";
import {
  FaPlus,
  FaUsers,
  FaEye,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const referrals = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    applicants: 24,
    status: "Active",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Backend Developer",
    applicants: 18,
    status: "Active",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Engineer",
    applicants: 31,
    status: "Closed",
  },
];

const MyReferral = () => {

  const [showForm, setShowForm] = useState(false);

  return (

    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="mt-12 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-2xl sm:text-3xl font-bold">
              My Referrals
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage all your referral posts.
            </p>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-xl"
          >

            <FaPlus />

            {showForm ? "Close Form" : "Create Referral"}

          </button>

        </div>

      </div>

      {showForm && (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">

          <h2 className="text-xl sm:text-2xl font-bold mb-5">
            Create New Referral
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Company Name"
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="text"
              placeholder="Job Role"
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="text"
              placeholder="Required Skills"
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="number"
              placeholder="Available Slots"
              className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <textarea
              rows="4"
              placeholder="Eligibility / Job Description"
              className="border rounded-xl p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="md:col-span-2">

              <button
                type="submit"
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-3 rounded-xl"
              >

                Post Referral

              </button>

            </div>

          </form>

        </div>

      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Total Referrals
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-3">
              12
            </h2>

            <p className="text-violet-500 text-sm mt-2">
              All Posts
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <FaBuilding
              className="text-violet-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Active
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mt-3">
              8
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Live Referrals
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaCheckCircle
              className="text-green-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Closed
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-red-500 mt-3">
              4
            </h2>

            <p className="text-red-500 text-sm mt-2">
              Closed Posts
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

            <FaTimesCircle
              className="text-red-500"
              size={24}
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><div className="hidden lg:block overflow-x-auto">

  <table className="w-full">

    <thead className="bg-gray-50">

      <tr>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Company
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Job Role
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Applicants
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Status
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {referrals.map((item) => (

        <tr
          key={item.id}
          className="border-b hover:bg-violet-50 transition-all duration-300"
        >

          <td className="px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">

                <FaBuilding className="text-violet-600" />

              </div>

              <div>

                <h2 className="font-semibold text-gray-800">
                  {item.company}
                </h2>

                <p className="text-sm text-gray-500">
                  Company
                </p>

              </div>

            </div>

          </td>

          <td className="px-6 py-5">
            {item.role}
          </td>

          <td className="px-6 py-5">

            <div className="flex items-center gap-2 font-medium">

              <FaUsers className="text-blue-600" />

              {item.applicants}

            </div>

          </td>

          <td className="px-6 py-5">

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                item.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {item.status === "Active" ? (
                <FaCheckCircle />
              ) : (
                <FaTimesCircle />
              )}

              {item.status}

            </span>

          </td>

          <td className="px-6 py-5">

            <button className="w-10 h-10 rounded-xl bg-violet-100 hover:bg-violet-200 transition flex items-center justify-center">

              <FaEye className="text-violet-600" />

            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div><div className="lg:hidden p-4 space-y-4">

  {referrals.map((item) => (

    <div
      key={item.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300"
    >

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">

          <FaBuilding className="text-violet-600 text-lg" />

        </div>

        <div className="flex-1">

          <h2 className="font-semibold text-gray-800">
            {item.company}
          </h2>

          <p className="text-sm text-gray-500">
            {item.role}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between items-center">

          <span className="text-gray-500 text-sm">
            Applicants
          </span>

          <div className="flex items-center gap-2 font-semibold">

            <FaUsers className="text-blue-600" />

            {item.applicants}

          </div>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-gray-500 text-sm">
            Status
          </span>

          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              item.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >

            {item.status === "Active" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}

            {item.status}

          </span>

        </div>

      </div>

      <button className="w-full mt-5 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-xl">

        <FaEye />

        View Referral

      </button>

    </div>

  ))}

</div>

</div>    </div>

  );
};

export default MyReferral;