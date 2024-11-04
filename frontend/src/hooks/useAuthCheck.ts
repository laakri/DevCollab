import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  username: string;
  role: string;
  exp: number;
}

export const useAuthCheck = () => {
  const { setUser, token, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = () => {
      if (!token) return;

      try {
        const decoded = jwtDecode<DecodedToken>(token);

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        // Set user data from token
        setUser({
          id: decoded.sub,
          username: decoded.username,
          role: decoded.role,
          isEmailVerified: true, // This comes from your token if available
          email: "", // This comes from your token if available
        });
      } catch (error) {
        console.error("Token validation error:", error);
        logout();
      }
    };

    checkAuth();
  }, [token, setUser, logout]);
};
