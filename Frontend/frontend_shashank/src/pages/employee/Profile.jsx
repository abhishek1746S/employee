import React from "react";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Profile = () => {
  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500">
          View and manage your profile information.
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left */}

          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/200?img=12"
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-violet-500"
              />

              <button
                className="absolute bottom-2 right-2 bg-violet-600 text-white p-3 rounded-full hover:bg-violet-700"
              >

                <FaCamera />

              </button>

            </div>

            <h2 className="text-2xl font-bold mt-5">
              Rahul Sharma
            </h2>

            <p className="text-gray-500">
              Software Engineer
            </p>

            <button
              className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl"
            >
              Edit Profile
            </button>

          </div>

          {/* Right */}

          <div className="flex-1">

            <h2 className="text-2xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="text-gray-500 text-sm">
                  Full Name
                </label>

                <div className="border rounded-xl p-3 mt-2">
                  Rahul Sharma
                </div>

              </div>

              <div>

                <label className="text-gray-500 text-sm">
                  Employee ID
                </label>

                <div className="border rounded-xl p-3 mt-2">
                  EMP-1025
                </div>

              </div>

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaEnvelope />

                  Email

                </label>

                <div className="border rounded-xl p-3 mt-2">
                  rahul@gmail.com
                </div>

              </div>

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaPhone />

                  Phone

                </label>

                <div className="border rounded-xl p-3 mt-2">
                  +91 9876543210
                </div>

              </div>

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaBuilding />

                  Company

                </label>

                <div className="border rounded-xl p-3 mt-2">
                  Google India
                </div>

              </div>

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaBriefcase />

                  Designation

                </label>

                <div className="border rounded-xl p-3 mt-2">
                  Software Engineer
                </div>

              </div>

              <div className="md:col-span-2">

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaMapMarkerAlt />

                  Address

                </label>

                <div className="border rounded-xl p-3 mt-2">
                  Bangalore, Karnataka, India
                </div>

              </div>

            </div>
                        {/* About */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-4">
                About Me
              </h2>

              <div className="border rounded-xl p-5 text-gray-600 leading-7">
                Passionate Software Engineer with experience in Web
                Development, React, FastAPI and AI-based applications.
                Interested in building scalable products and helping
                students through ReferralX.
              </div>

            </div>

            {/* Skills */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-4">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {[
                  "React",
                  "Next.js",
                  "FastAPI",
                  "Python",
                  "Tailwind CSS",
                  "JavaScript",
                  "SQL",
                  "Git",
                ].map((skill, index) => (

                  <span
                    key={index}
                    className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Experience */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-4">
                Experience
              </h2>

              <div className="border rounded-xl p-5">

                <h3 className="font-bold">
                  Software Engineer
                </h3>

                <p className="text-gray-500">
                  Google India
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Jan 2024 - Present
                </p>

                <p className="mt-4 text-gray-600">
                  Working on scalable web applications, backend APIs,
                  referral management systems and cloud deployment.
                </p>

              </div>

            </div>

            {/* Social Links */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-4">
                Social Links
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  value="https://github.com/username"
                  readOnly
                  className="border rounded-xl p-3"
                />

                <input
                  type="text"
                  value="https://linkedin.com/in/username"
                  readOnly
                  className="border rounded-xl p-3"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;