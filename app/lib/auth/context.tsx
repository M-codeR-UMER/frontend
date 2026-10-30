import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { apiClient, type AuthTokens as ApiAuthTokens } from "~/lib/api/client";

export type AuthTokens = ApiAuthTokens;

type UserRole = "doctor" | "patient" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  loginAsDoctor: (email: string, password: string) => Promise<void>;
  loginAsPatient: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isDoctor: boolean;
  isPatient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginAsDoctor = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authTokens = await apiClient.doctorLogin({ email, password });
      setTokens(authTokens);
      setUser({ id: "", email, name: "", role: "doctor" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAsPatient = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authTokens = await apiClient.patientLogin({ email, password });
      setTokens(authTokens);
      setUser({ id: "", email, name: "", role: "patient" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user?.role === "doctor") {
        await apiClient.doctorLogout();
      } else if (user?.role === "patient") {
        await apiClient.patientLogout();
      }
    } finally {
      apiClient.clearTokens();
      setTokens(null);
      setUser(null);
      setIsLoading(false);
    }
  }, [user?.role]);

  const value: AuthContextType = {
    user,
    tokens,
    isLoading,
    loginAsDoctor,
    loginAsPatient,
    logout,
    isAuthenticated: !!tokens,
    isDoctor: user?.role === "doctor",
    isPatient: user?.role === "patient",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}