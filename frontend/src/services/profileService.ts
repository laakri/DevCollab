import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

interface ProfileData {
  [key: string]: any;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const profileService = {
  async getProfile() {
    const response = await axios.get(`${API_URL}/profile`, getAuthHeader());
    return response.data;
  },

  async updateProfile(profileData: ProfileData) {
    // Remove empty strings, undefined values, and null values
    const cleanedData = Object.entries(profileData).reduce<ProfileData>(
      (acc, [key, value]) => {
        // Only include the field if it has a non-empty value
        if (value !== "" && value !== undefined && value !== null) {
          acc[key] = value;
        } else {
          // Explicitly set null for empty strings to remove the value in the database
          acc[key] = null;
        }
        return acc;
      },
      {}
    );

    const response = await axios.post(
      `${API_URL}/profile`,
      cleanedData,
      getAuthHeader()
    );
    return response.data;
  },

  async getSettings() {
    const response = await axios.get(`${API_URL}/settings`, getAuthHeader());
    return response.data;
  },

  async updateSettings(settingsData: ProfileData) {
    const response = await axios.post(
      `${API_URL}/settings`,
      settingsData,
      getAuthHeader()
    );
    return response.data;
  },
};
