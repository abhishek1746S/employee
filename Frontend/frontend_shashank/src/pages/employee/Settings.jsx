import React from "react";
import { FaUser, FaLock, FaBell, FaMoon } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
        <div className="mt-12 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <FaUser className="text-violet-600 text-xl" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Profile Information
            </h2>

            <p className="text-gray-500 text-sm">
              Update your personal details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>

            <input
              type="text"
              defaultValue="Rahul Sharma"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              defaultValue="rahul@gmail.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <FaLock className="text-violet-600 text-xl" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Change Password
            </h2>

            <p className="text-gray-500 text-sm">Keep your account secure.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        {" "}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <FaLock className="text-violet-600 text-xl" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Change Password
            </h2>

            <p className="text-gray-500 text-sm">Keep your account secure.</p>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-6"></div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-3 rounded-xl font-semibold">
            Save Changes
          </button>

          <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 transition px-8 py-3 rounded-xl font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
