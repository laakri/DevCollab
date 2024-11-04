import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  async register(userData: {
    email: string;
    password: string;
    username: string;
  }) {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  async verifyEmail(token: string) {
    const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
    return response.data;
  },
};
