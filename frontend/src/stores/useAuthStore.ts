import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  isEmailVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user: User) => set({ user, isAuthenticated: true }),

      login: async (email: string, password: string) => {
        try {
          const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
          }

          const data = await response.json();
          set({
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        try {
          const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
          }

          const data = await response.json();
          set({
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Registration error:", error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
