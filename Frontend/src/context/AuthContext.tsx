import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService } from '../services/api';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('token');
    console.log("🔍 Checking stored token:", storedToken ? "Found" : "Not found");
    
    if (storedToken) {
      setToken(storedToken);
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = userService.getCurrentUser();
      console.log("🔍 Current user from token:", currentUser);
      
      // ✅ FIX: Better validation - check if userId exists and is valid
      if (currentUser && currentUser.userId && !isNaN(currentUser.userId)) {
        try {
          // Try to fetch full user details from API
          const response = await userService.getUser(currentUser.userId);
          console.log("✅ Full user loaded from API:", response.data.data);
          setUser(response.data.data);
        } catch (apiError) {
          console.warn("⚠️ Could not fetch full user from API, using token data:", apiError);
          // If API call fails, use data from token
          setUser({
            userId: currentUser.userId,
            email: currentUser.email || "",
            firstName: currentUser.firstName || "User",
            lastName: currentUser.lastName || "",
            phoneNumber: "",
            userType: currentUser.userType || "Customer"
          } as User);
        }
      } else {
        console.error("❌ No valid userId found in token! Token data:", currentUser);
        logout();
      }
    } catch (error) {
      console.error('❌ Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("🔐 Attempting login for:", email);
      const response = await userService.login({ email, password });
      const newToken = response.data.data;
      
      console.log("✅ Login successful! Token received");
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Decode token to get user info
      const payload = JSON.parse(atob(newToken.split('.')[1]));
      console.log("🔍 Token payload:", payload);
      
      // Extract userId from different possible field names
      const userIdStr = payload.nameid || payload.userId || payload.sub || payload.id;
      
      if (!userIdStr) {
        throw new Error("No userId found in token payload");
      }
      
      const userId = parseInt(userIdStr, 10);
      
      if (isNaN(userId)) {
        throw new Error("Invalid userId in token payload");
      }
      
      console.log("✅ User ID extracted:", userId);
      
      try {
        // Try to fetch full user details
        const userResponse = await userService.getUser(userId);
        console.log("✅ Full user details loaded:", userResponse.data.data);
        setUser(userResponse.data.data);
      } catch (apiError) {
        console.warn("⚠️ Could not fetch full user details, using token data");
        // Fallback to token data if API call fails
        setUser({
          userId: userId,
          email: payload.email || payload.unique_name || email,
          firstName: payload.given_name || payload.firstName || "User",
          lastName: payload.family_name || payload.lastName || "",
          phoneNumber: payload.phone_number || "",
          userType: payload.role || payload.userType || "Customer"
        } as User);
      }
      
      setLoading(false);
      
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      console.log("📝 Attempting registration for:", data.email);
      await userService.register(data);
      console.log("✅ Registration successful!");
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("👋 Logging out...");
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};