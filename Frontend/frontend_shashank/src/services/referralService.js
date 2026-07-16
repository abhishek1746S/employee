import api from "./api";

export const getAllReferrals = async () => {
  const response = await api.get("/referrals/");
  return response.data;
};

export const getReferral = async (id) => {
  const response = await api.get(`/referrals/${id}`);
  return response.data;
};

export const createReferral = async (data) => {
  const response = await api.post("/referrals/", data);
  return response.data;
};

export const closeReferral = async (id) => {
  const response = await api.patch(`/referrals/${id}/close`);
  return response.data;
};

export const reopenReferral = async (id) => {
  const response = await api.patch(`/referrals/${id}/reopen`);
  return response.data;
};

export const getRankings = async (id) => {
  const response = await api.get(`/referrals/${id}/rankings`);
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get("/referrals/employee/dashboard");
  return response.data;
};
