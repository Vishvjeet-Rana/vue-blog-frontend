import api from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const register = async (form: FormData) => {
  const response = await api.post("/auth/register", form);

  return response.data;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // user object
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    newPassword,
  });
  return response.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const response = await api.post(`/auth/change-password`, {
    oldPassword,
    newPassword,
  });
  return response.data;
};
