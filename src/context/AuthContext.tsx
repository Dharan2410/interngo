///dharan's use for db 
import React, { createContext, useContext, useEffect, useState } from "react";
const BASE = "http://localhost:4000/interngo"; // your backend URL
interface User {
  uid: string;
  name?: string;
  email: string;
  role: "admin" | "mentor" | "interviewer" | "intern";
  profileImage?: string | null;
  batch?: string | null;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function restoreSession() {
      try {
        const res = await fetch(`${BASE}/me`, {
          method: "GET",
          credentials: "include", // REQUIRED for cookies
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${BASE}/logout`, {
        method: "POST",
        credentials: "include", // send cookies
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};