import React, { useState } from "react";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    employeeId: "EMP-1025",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    company: "Google India",
    designation: "Software Engineer",
    address: "Bangalore, Karnataka, India",
    about:
      "Passionate Software Engineer with experience in Web Development, React, FastAPI and AI-based applications. Interested in building scalable products and helping students through ReferralX.",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
  });

  return (

    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">

        <div className="mt-12 lg:mt-0">

          <h1 className="text-2xl sm:text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            View and manage your profile information.
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8">

        <div className="flex flex-col xl:flex-row gap-8">

          <div className="xl:w-80 flex flex-col items-center">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/200?img=12"
                alt="profile"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-violet-500"
              />

              <button className="absolute bottom-2 right-2 bg-violet-600 hover:bg-violet-700 transition text-white p-3 rounded-full">

                <FaCamera />

              </button>

            </div>

            <h2 className="text-2xl font-bold mt-5 text-center">

              {profile.name}

            </h2>

            <p className="text-gray-500 text-center">

              {profile.designation}

            </p>

            {!isEditing ? (

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full sm:w-auto bg-violet-600 hover:bg-violet-700 transition text-white px-8 py-3 rounded-xl"
              >

                Edit Profile

              </button>

            ) : (

              <button
                onClick={() => setIsEditing(false)}
                className="mt-6 w-full sm:w-auto bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-xl"
              >

                Cancel Editing

              </button>

            )}

          </div>

          <div className="flex-1">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>

                <label className="text-gray-500 text-sm">
                  Employee ID
                </label>

                <input
                  type="text"
                  value={profile.employeeId}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      employeeId: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>

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
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>

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

              <div>

                <label className="text-gray-500 text-sm flex items-center gap-2">

                  <FaBuilding />

                  Company

                </label>

                <input
                  type="text"
                  value={profile.company}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      company: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-violet-500"
                />

              </div>

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

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                About Me
              </h2>

              <textarea
                rows="5"
                value={profile.about}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    about: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-5 outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
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
                    className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Experience
              </h2>

              <div className="border rounded-2xl p-5">

                <h3 className="font-bold text-lg">
                  Software Engineer
                </h3>

                <p className="text-gray-500">
                  Google India
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Jan 2024 - Present
                </p>

                <p className="mt-4 text-gray-600 leading-7">
                  Working on scalable web applications, backend APIs,
                  referral management systems and cloud deployment.
                </p>

              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Social Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="text-gray-500 text-sm mb-2 block">
                    GitHub
                  </label>

                  <input
                    type="text"
                    value={profile.github}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        github: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />

                </div>

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

              </div>

            </div>

            {isEditing && (

              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <button
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl transition"
                >

                  Save Changes

                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-xl transition"
                >

                  Cancel

                </button>

              </div>

            )}          </div>

        </div>

      </div>

    </div>

  );
};

export default Profile;