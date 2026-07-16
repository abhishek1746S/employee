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
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            Shortlisted Candidates
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Candidates selected for interview.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Total Shortlisted
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-3">
              18
            </h2>

            <p className="text-green-500 text-sm mt-2">
              +4 this week
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <FaUserGraduate
              className="text-violet-600"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Interview Pending
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mt-3">
              10
            </h2>

            <p className="text-orange-500 text-sm mt-2">
              Waiting Schedule
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

            <FaCalendarAlt
              className="text-orange-500"
              size={24}
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Interview Completed
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mt-3">
              8
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Successfully Finished
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaEye
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
          Resume Score
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Status
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {candidates.map((candidate) => (

        <tr
          key={candidate.id}
          className="border-b hover:bg-violet-50 transition-all duration-300"
        >

          <td className="px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">

                <FaUserGraduate className="text-violet-600" />

              </div>

              <div>

                <h2 className="font-semibold text-gray-800">
                  {candidate.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Candidate
                </p>

              </div>

            </div>

          </td>

          <td className="px-6 py-5">

            <span className="font-medium">
              {candidate.role}
            </span>

          </td>

          <td className="px-6 py-5">

            <span className="text-green-600 font-bold text-lg">
              {candidate.score}%
            </span>

          </td>

          <td className="px-6 py-5">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                candidate.status === "Ready"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {candidate.status}
            </span>

          </td>

          <td className="px-6 py-5">

            <div className="flex items-center gap-5">

              <button className="w-10 h-10 rounded-xl bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition">

                <FaEye className="text-violet-600" />

              </button>

              <button className="w-10 h-10 rounded-xl bg-green-100 hover:bg-green-200 flex items-center justify-center transition">

                <FaCalendarAlt className="text-green-600" />

              </button>

            </div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
<div className="lg:hidden p-4 space-y-4">

  {candidates.map((candidate) => (

    <div
      key={candidate.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-300"
    >

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">

          <FaUserGraduate className="text-violet-600 text-lg" />

        </div>

        <div className="flex-1">

          <h2 className="font-semibold text-gray-800">
            {candidate.name}
          </h2>

          <p className="text-sm text-gray-500">
            {candidate.role}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between items-center">

          <span className="text-gray-500 text-sm">
            Resume Score
          </span>

          <span className="font-bold text-green-600">
            {candidate.score}%
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-gray-500 text-sm">
            Status
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              candidate.status === "Ready"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {candidate.status}
          </span>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <button className="flex-1 flex items-center justify-center gap-2 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition">

          <FaEye />

          View

        </button>

        <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">

          <FaCalendarAlt />

          Schedule

        </button>

      </div>

    </div>

  ))}

</div>

</div>
    </div>

  );
};

export default ShortList;