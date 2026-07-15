import React from "react";
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";

const candidates = [
  {
    id: 1,
    name: "Ananya Singh",
    role: "Frontend Developer",
    score: 92,
    status: "Ready",
  },
  {
    id: 2,
    name: "Rohit Verma",
    role: "Backend Developer",
    score: 88,
    status: "Ready",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Software Engineer",
    score: 84,
    status: "Interviewed",
  },
  {
    id: 4,
    name: "Aman Yadav",
    role: "React Developer",
    score: 81,
    status: "Ready",
  },
];

const ShortList = () => {
  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Shortlisted Candidates
          </h1>

          <p className="text-gray-500">
            Candidates selected for interview.
          </p>
        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Total Shortlisted</p>
          <h2 className="text-4xl font-bold mt-2">18</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Interview Pending</p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">10</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Interview Completed</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">8</h2>
        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Candidate</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Resume Score</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {candidates.map((candidate) => (

              <tr
                key={candidate.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">

                    <FaUserGraduate className="text-violet-600" />

                  </div>

                  {candidate.name}

                </td>

                <td className="p-4">
                  {candidate.role}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  {candidate.score}%
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      candidate.status === "Ready"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {candidate.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-4">

                    <button className="text-violet-600 hover:text-violet-800">
                      <FaEye size={18} />
                    </button>

                    <button className="text-green-600 hover:text-green-800">
                      <FaCalendarAlt size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ShortList;