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
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Referrals Issued
          </h1>

          <p className="text-gray-500">
            Track all referrals sent to candidates.
          </p>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <p className="text-gray-500">
            Total Referrals
          </p>

          <h2 className="text-4xl font-bold mt-2">
            42
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">

          <p className="text-gray-500">
            Accepted
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            28
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">

          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            14
          </h2>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Candidate</th>
              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Issued Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {referrals.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">

                    <FaPaperPlane className="text-violet-600"/>

                  </div>

                  {item.candidate}

                </td>

                <td className="p-4">
                  {item.company}
                </td>

                <td className="p-4">
                  {item.role}
                </td>

                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4">

                  <span
                    className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-sm ${
                      item.status === "Accepted"
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

export default ReferralsIssued;