import React from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";

const referrals = [
  {
    id: 1,
    candidate: "Ananya Singh",
    company: "Google",
    role: "Frontend Developer",
    date: "26 Jun 2026",
    status: "Accepted",
  },
  {
    id: 2,
    candidate: "Rohit Verma",
    company: "Microsoft",
    role: "Backend Developer",
    date: "25 Jun 2026",
    status: "Pending",
  },
  {
    id: 3,
    candidate: "Priya Sharma",
    company: "Amazon",
    role: "Software Engineer",
    date: "24 Jun 2026",
    status: "Accepted",
  },
  {
    id: 4,
    candidate: "Aman Yadav",
    company: "Adobe",
    role: "React Developer",
    date: "22 Jun 2026",
    status: "Pending",
  },
];

const ReferralsIssued = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Referrals Issued
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Track all referrals sent to candidates.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Total Referrals
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-3">
              42
            </h2>

            <p className="text-violet-500 text-sm mt-2">
              Overall Referrals
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <FaPaperPlane
              className="text-violet-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Accepted
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mt-3">
              28
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Successfully Joined
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaCheckCircle
              className="text-green-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Pending
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-yellow-500 mt-3">
              14
            </h2>

            <p className="text-yellow-500 text-sm mt-2">
              Awaiting Response
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

            <FaClock
              className="text-yellow-500"
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
                Candidate
              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                Company
              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                Role
              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-600">
                Issued Date
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

                      <FaPaperPlane className="text-violet-600" />

                    </div>

                    <div>

                      <h2 className="font-semibold text-gray-800">
                        {item.candidate}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Candidate
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5 font-medium">
                  {item.company}
                </td>

                <td className="px-6 py-5">
                  {item.role}
                </td>

                <td className="px-6 py-5">
                  {item.date}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${item.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >

                    {item.status === "Accepted" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaClock />
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

                  <FaPaperPlane className="text-violet-600 text-lg" />

                </div>

                <div className="flex-1">

                  <h2 className="font-semibold text-gray-800">
                    {item.candidate}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <div className="flex justify-between items-center">

                  <span className="text-gray-500 text-sm">
                    Company
                  </span>

                  <span className="font-semibold">
                    {item.company}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-500 text-sm">
                    Issued Date
                  </span>

                  <span>
                    {item.date}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-500 text-sm">
                    Status
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${item.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >

                    {item.status === "Accepted" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaClock />
                    )}

                    {item.status}

                  </span>

                </div>

              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 transition text-white py-3 rounded-xl">

                <FaEye />

                View Details

              </button>

            </div>

          ))}

        </div>

      </div>    </div>

  );
};

export default ReferralsIssued;