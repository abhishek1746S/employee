import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/profile/me",
    profileData
  );

  return response.data;
};

export const uploadProfilePic = async (
  formData
) => {
  const response = await api.post(
    "/profile/me/upload-pic",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const uploadResume = async (
  formData
) => {
  const response = await api.post(
    "/profile/me/upload-resume",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(
    `/profile/${userId}`
  );

  return response.data;
};