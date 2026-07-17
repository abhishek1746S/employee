import api from "./api";

// ==========================
// Get Logged-in User Profile
// ==========================
export const getProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (profileData) => {
  const response = await api.put("/profile/me", profileData);
  return response.data;
};

// ==========================
// Change Password
// ==========================
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/profile/change-password",
    passwordData
  );

  return response.data;
};

// ==========================
// Upload Profile Picture
// ==========================
export const uploadProfilePic = async (formData) => {
  const response = await api.post(
    "/profile/upload-profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Upload Resume
// (Keep only if backend endpoint exists)
// ==========================
export const uploadResume = async (formData) => {
  const response = await api.post(
    "/profile/upload-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Get User Profile by ID
// ==========================
export const getUserProfile = async (userId) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data;
};