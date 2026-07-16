import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaUsers,
  FaEye,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getAllReferrals,
  createReferral,
  closeReferral,
  reopenReferral,
} from "../../services/referralService.js";

const MyReferral = () => {

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [referrals, setReferrals] = useState([]);

  const [formData, setFormData] = useState({
    company_name: "",
    job_role: "",
    required_skills: "",
    eligibility: "",
    slots: 1,
  });

  const loadReferrals = async () => {
    try {
      const data = await getAllReferrals();
      setReferrals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferrals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "slots" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReferral(formData);

      alert("Referral Created Successfully");

      setFormData({
        company_name: "",
        job_role: "",
        required_skills: "",
        eligibility: "",
        slots: 1,
      });

      setShowForm(false);

      loadReferrals();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to create referral"
      );
    }
  };

  const handleToggleStatus = async (item) => {
  try {

    if (item.is_active) {
      await closeReferral(item.id);
    } else {
      await reopenReferral(item.id);
    }

    await loadReferrals();

  } catch (error) {
    console.error(error);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8F9FC]">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (<div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

  {/* Header */}

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

  {/* Create Referral Form */}

  {showForm && (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">

      <h2 className="text-xl sm:text-2xl font-bold mb-5">
        Create New Referral
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="text"
          name="job_role"
          value={formData.job_role}
          onChange={handleChange}
          placeholder="Job Role"
          required
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="text"
          name="required_skills"
          value={formData.required_skills}
          onChange={handleChange}
          placeholder="Required Skills (React, FastAPI, SQL)"
          required
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="number"
          name="slots"
          value={formData.slots}
          onChange={handleChange}
          min="1"
          required
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <textarea
          rows="4"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          placeholder="Eligibility / Job Description"
          className="border rounded-xl p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <div className="md:col-span-2 flex gap-3">

          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-3 rounded-xl"
          >
            Post Referral
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="border border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  )}
        {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

        {/* Total Referrals */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Total Referrals
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-3">
              {referrals.length}
            </h2>

            <p className="text-violet-500 text-sm mt-2">
              All Referral Posts
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <FaBuilding
              className="text-violet-600"
              size={24}
            />

          </div>

        </div>

        {/* Active */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Active Referrals
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mt-3">
              {
                referrals.filter(
                  (item) => item.is_active
                ).length
              }
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Currently Live
            </p>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaCheckCircle
              className="text-green-600"
              size={24}
            />

          </div>

        </div>

        {/* Closed */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">

          <div>

            <p className="text-gray-500 text-sm">
              Closed Referrals
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold text-red-500 mt-3">
              {
                referrals.filter(
                  (item) => !item.is_active
                ).length
              }
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

      {/* Referral List */}
      <div className="hidden lg:block overflow-x-auto">

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
          Skills
        </th>

        <th className="text-left px-6 py-4 font-semibold text-gray-600">
          Slots
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

      {referrals.length > 0 ? (

        referrals.map((item) => (

          <tr
            key={item.id}
            className="border-b hover:bg-violet-50 transition-all"
          >

            <td className="px-6 py-5">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">

                  <FaBuilding className="text-violet-600" />

                </div>

                <div>

                  <h2 className="font-semibold text-gray-800">
                    {item.company_name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Company
                  </p>

                </div>

              </div>

            </td>

            <td className="px-6 py-5">
              {item.job_role}
            </td>

            <td className="px-6 py-5">
              {item.required_skills}
            </td>

            <td className="px-6 py-5">
              {item.slots}
            </td>

            <td className="px-6 py-5">

              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  item.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {item.is_active ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimesCircle />
                )}

                {item.is_active ? "Active" : "Closed"}

              </span>

            </td>

            <td className="px-6 py-5">

              <div className="flex gap-3">
                                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    item.is_active
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {item.is_active ? "Close" : "Reopen"}
                </button>

                <button
                  className="w-10 h-10 rounded-xl bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition"
                >
                  <FaEye className="text-violet-600" />
                </button>

              </div>

            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan="6"
            className="text-center py-10 text-gray-500"
          >
            No referrals found.
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>
{/* Mobile View */}

<div className="lg:hidden space-y-4 mt-6">

  {referrals.length > 0 ? (

    referrals.map((item) => (

      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
      >

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">

            <FaBuilding className="text-violet-600 text-lg" />

          </div>

          <div>

            <h2 className="font-semibold">
              {item.company_name}
            </h2>

            <p className="text-gray-500 text-sm">
              {item.job_role}
            </p>

          </div>

        </div>

        <div className="mt-5 space-y-3">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Skills
            </span>

            <span className="font-medium text-right">
              {item.required_skills}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Slots
            </span>

            <span className="font-semibold">
              {item.slots}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500">
              Status
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                item.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.is_active ? "Active" : "Closed"}
            </span>

          </div>

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => handleToggleStatus(item)}
            className={`flex-1 py-3 rounded-xl text-white transition ${
              item.is_active
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {item.is_active ? "Close" : "Reopen"}
          </button>

          <button
            className="w-14 rounded-xl bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center"
          >
            <FaEye />
          </button>

        </div>

      </div>

    ))

  ) : (

    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">

      <FaBuilding
        size={50}
        className="mx-auto text-violet-500 mb-4"
      />

      <h2 className="text-xl font-bold">
        No Referrals Found
      </h2>

      <p className="text-gray-500 mt-2">
        Click "Create Referral" to add your first referral.
      </p>

    </div>

  )}

</div>

</div>

);
};

export default MyReferral;