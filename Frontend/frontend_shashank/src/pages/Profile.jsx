import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getProfile,
  updateProfile,
  uploadProfilePic,
  uploadResume,
} from "../services/profileService";

import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);

      setFormData({
        name: data?.name || "",
        bio: data?.bio || "",
        skills: data?.skills || "",
        linkedin: data?.linkedin || "",
        github: data?.github || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: formData.name,
        bio: formData.bio,
        skills: formData.skills,
        linkedin: formData.linkedin,
        github: formData.github,
      };

      await updateProfile(payload);

      alert("Profile Updated Successfully");

      setEditMode(false);

      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      await uploadProfilePic(data);

      alert("Profile Picture Uploaded");

      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to upload picture");
    }
  };

  const handleResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      await uploadResume(data);

      alert("Resume Uploaded Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume");
    }
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="profile-layout">
          <Sidebar />
          <div className="profile-content">
            <h2>Loading Profile...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-layout">
        <Sidebar />

        <div className="profile-content">
          <h1>My Profile</h1>

          <div className="profile-card">
            {/* HEADER */}

            <div className="profile-header">
              <img
                src={
                  profile?.profile_pic
                    ? profile.profile_pic
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile?.name || "User",
                      )}&background=2563eb&color=ffffff&size=256`
                }
                alt="Profile"
                className="profile-image"
              />

              <div className="profile-details">
                <h2>{profile.name}</h2>

                <p>{profile.email}</p>

                <span className="role-badge">{profile.role}</span>

                <br />

                <label className="upload-btn">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                  />
                </label>
              </div>
            </div>

            {/* VIEW MODE */}

            {!editMode ? (
              <>
                <div className="profile-section">
                  <h3>About Me</h3>

                  <p>{profile.bio || "No bio added yet."}</p>
                </div>

                <div className="profile-section">
                  <h3>Skills</h3>

                  <div className="skills-box">
                    {profile.skills ? (
                      profile.skills
                        .split(",")
                        .filter((skill) => skill.trim() !== "")
                        .map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill.trim()}
                          </span>
                        ))
                    ) : (
                      <p>No skills added.</p>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h3>LinkedIn</h3>

                  {profile.linkedin ? (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="profile-link"
                    >
                      {profile.linkedin}
                    </a>
                  ) : (
                    <p>Not Added</p>
                  )}
                </div>

                <div className="profile-section">
                  <h3>GitHub</h3>

                  {profile.github ? (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="profile-link"
                    >
                      {profile.github}
                    </a>
                  ) : (
                    <p>Not Added</p>
                  )}
                </div>

                <button
                  className="primary-btn"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                {/* EDIT MODE */}

                <div className="profile-section">
                  <div className="info-grid">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="skills"
                      placeholder="React, Java, FastAPI"
                      value={formData.skills}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn URL"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="github"
                      placeholder="GitHub URL"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>

                  <textarea
                    name="bio"
                    placeholder="Write something about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                  />

                  <div className="button-group">
                    <button className="primary-btn" onClick={handleUpdate}>
                      Save Changes
                    </button>

                    <button
                      className="secondary-btn"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* RESUME */}

            <div className="resume-section">
              <h3>📄 Resume</h3>

              <div className="resume-upload">
                <p>Upload your latest resume</p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
