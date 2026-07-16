import React, { useEffect, useState } from "react";

import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
  uploadProfilePic,
} from "../../services/profileService";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company_name: "",
    company_email: "",
    phone: "",
    designation: "",
    address: "",
    bio: "",
    linkedin: "",
    github: "",
    profile_pic: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const data = await getProfile();

      setProfile({
        name: data.name || "",
        email: data.email || "",
        company_name: data.company_name || "",
        company_email: data.company_email || "",
        phone: data.phone || "",
        designation: data.designation || "",
        address: data.address || "",
        bio: data.bio || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        profile_pic: data.profile_pic || "",
      });

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };
    // ==========================================
  // Upload Profile Picture
  // ==========================================

  const handleProfilePic = async (e) => {
    try {

      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);

      const response = await uploadProfilePic(formData);

      setProfile((prev) => ({
        ...prev,
        profile_pic: response.profile_pic,
      }));

    } catch (error) {

      console.error(error);

      alert("Failed to upload profile picture");

    }
  };


  // ==========================================
  // Save Profile
  // ==========================================

const handleSave = async () => {
  try {

    
const response = await updateProfile(profile);

console.log("UPDATE RESPONSE =", response);

await loadProfile();
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      user.name = response.profile.name;
      user.company_name = response.profile.company_name;
      user.profile_pic = response.profile.profile_pic;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }

    localStorage.setItem(
      "employeeProfile",
      JSON.stringify(response.profile)
    );

    setIsEditing(false);

    alert("Profile Updated Successfully");

  }catch (error) {

  console.error("Full Error:", error);

  console.log("Response:", error.response);

  console.log("Data:", error.response?.data);

  alert(JSON.stringify(error.response?.data));

}


};


  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-violet-600">
          Loading Profile...
        </h2>
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your profile information.
        </p>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">

        <div className="flex flex-col xl:flex-row gap-8">

          {/* Left Side */}
                    <div className="xl:w-80 flex flex-col items-center">

            <div className="relative">

              <img
                src={
                  profile.profile_pic ||
                  "https://i.pravatar.cc/200?img=12"
                }
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-violet-500 shadow-lg"
              />

              <label className="absolute bottom-2 right-2 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full cursor-pointer transition">

                <FaCamera />

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePic}
                />

              </label>

            </div>

            <h2 className="text-2xl font-bold mt-5 text-center">
              {profile.name}
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              {profile.designation || "Employee"}
            </p>

            <p className="text-sm text-gray-400 mt-1 text-center">
              {profile.company_name}
            </p>

            {!isEditing ? (

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl transition"
              >
                Edit Profile
              </button>

            ) : (

              <button
                onClick={() => setIsEditing(false)}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
              >
                Cancel Editing
              </button>

            )}

          </div>

          {/* Right Side */}

          <div className="flex-1">

            <h2 className="text-2xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}

              <div>

                <label className="text-gray-500 text-sm">
                  Full Name
                </label>

                <input
                  type="text"
                  value={profile.name}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>


              {/* Email */}

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaEnvelope />

                  Email

                </label>

                <input
  type="email"
  value={profile.email}
  readOnly={!isEditing}
  onChange={(e) =>
    setProfile({
      ...profile,
      email: e.target.value,
    })
  }
  className={`w-full border rounded-xl p-3 mt-2 ${
    isEditing
      ? "outline-none focus:ring-2 focus:ring-violet-500"
      : "bg-gray-100"
  }`}
/>

              </div>


              {/* Phone */}

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaPhone />

                  Phone

                </label>

                <input
                  type="text"
                  value={profile.phone}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>


              {/* Company */}

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaBuilding />

                  Company

                </label>

                <input
                  type="text"
                  value={profile.company_name}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      company_name: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>


              {/* Designation */}

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaBriefcase />

                  Designation

                </label>

                <input
                  type="text"
                  value={profile.designation}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      designation: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>


              {/* Address */}

              <div className="md:col-span-2">

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaMapMarkerAlt />

                  Address

                </label>

                <input
                  type="text"
                  value={profile.address}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      address: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>

            </div>
                        {/* About Me */}

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                About Me
              </h2>

              <textarea
                rows={5}
                value={profile.bio}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bio: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-5 outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>


            {/* Social Links */}

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Social Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="text-gray-500 text-sm mb-2 block">
                    LinkedIn
                  </label>

                  <input
                    type="text"
                    value={profile.linkedin}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        linkedin: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />

                </div>

                <div>

                  <label className="text-gray-500 text-sm mb-2 block">
                    Company Email
                  </label>

                  <input
                    type="email"
                    value={profile.company_email}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        company_email: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />

                </div>

              </div>

            </div>


            {/* Buttons */}

            {isEditing && (

              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    loadProfile();
                  }}
                  className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-xl transition"
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;