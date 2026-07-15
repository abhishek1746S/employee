import React from "react";
import { FaUser, FaLock, FaBell, FaMoon } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-violet-600 text-xl" />
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Rahul Sharma"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              defaultValue="rahul@gmail.com"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
            />
          </div>

        </div>

      </div>

      {/* Password */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">
          <FaLock className="text-violet-600 text-xl" />
          <h2 className="text-xl font-semibold">
            Change Password
          </h2>
        </div>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-violet-600"
          />

        </div>

      </div>

      {/* Preferences */}

      <div className="bg-white rounded-2xl shadow-sm p-6">


        <button className="mt-8 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold">
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default Settings;