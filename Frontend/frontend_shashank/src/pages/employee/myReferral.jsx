import React from "react";
import { useState } from "react";
import { FaPlus, FaUsers, FaEye } from "react-icons/fa";
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
    <div className="p-6 bg-[#F8F9FC] min-h-screen">

      {/* Header */}
<div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold">My Referrals</h1>
    <p className="text-gray-500">
      Manage all your referral posts.
    </p>
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    className="flex items-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-xl hover:bg-violet-700"
  >
    <FaPlus />
    {showForm ? "Close Form" : "Create Referral"}
  </button>
</div>
{showForm && (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4">Create New Referral</h2>

    <form className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Company Name"
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Job Role"
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Required Skills"
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        placeholder="Available Slots"
        className="border rounded-lg p-3"
      />

      <textarea
        placeholder="Eligibility / Job Description"
        className="border rounded-lg p-3 md:col-span-2"
        rows="4"
      />

      <div className="md:col-span-2">
        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
        >
          Post Referral
        </button>
      </div>
    </form>
  </div>
)}
      {/* Cards */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-500">Total Referrals</h2>
          <h1 className="text-4xl font-bold mt-2">12</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-500">Active</h2>
          <h1 className="text-4xl font-bold mt-2 text-green-600">8</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-500">Closed</h2>
          <h1 className="text-4xl font-bold mt-2 text-red-500">4</h1>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Applicants</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {referrals.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">{item.company}</td>

                <td className="p-4">{item.role}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    {item.applicants}
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="flex items-center gap-2 text-violet-600 hover:text-violet-800">
                    <FaEye />
                    View
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyReferral;