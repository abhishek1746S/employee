import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";


import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profileService";
const Settings = () => {


  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // =====================================
  // Load Profile
  // =====================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const data = await getProfile();

    console.log("PROFILE DATA:", data);

    setProfile({
      name: data.name || "",
      email: data.email || "",
    });

  } catch (err) {
    console.error("ERROR:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    alert(err.response?.data?.detail || err.message);
  }
};
  // =====================================
  // Update Profile
  // =====================================

  const handleUpdateProfile = async () => {

    try {

      setLoading(true);

      await updateProfile(profile);

      alert("Profile updated successfully");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.detail ||
        "Profile update failed"
      );

    } finally {
      setLoading(false);
    }

  };

  // =====================================
  // Change Password
  // =====================================

  const handleChangePassword = async () => {

    if (
      password.new_password !==
      password.confirm_password
    ) {
      return alert("Passwords do not match");
    }

    try {

      setLoading(true);

      await changePassword(password);

      alert("Password changed successfully");

      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.detail ||
        "Password change failed"
      );

    } finally {
      setLoading(false);
    }

  };
    return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
        <div className="mt-12 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <FaUser className="text-violet-600 text-xl"/>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Profile Information
            </h2>

            <p className="text-gray-500 text-sm">
              Update your profile.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e)=>
                setProfile({
                  ...profile,
                  name:e.target.value
                })
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              onChange={(e)=>
                setProfile({
                  ...profile,
                  email:e.target.value
                })
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
            />

          </div>

        </div>

      </div>

      {/* Password Section */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <FaLock className="text-violet-600 text-xl"/>
          </div>

          <div>

            <h2 className="text-xl font-semibold">
              Change Password
            </h2>

            <p className="text-gray-500 text-sm">
              Keep your account secure.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={password.current_password}
            onChange={(e)=>
              setPassword({
                ...password,
                current_password:e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.new_password}
            onChange={(e)=>
              setPassword({
                ...password,
                new_password:e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={password.confirm_password}
            onChange={(e)=>
              setPassword({
                ...password,
                confirm_password:e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

          <button
            onClick={fetchProfile}
            className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );

};

export default Settings;