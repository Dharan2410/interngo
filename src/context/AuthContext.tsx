



// import React, { createContext, useContext, useEffect, useState } from "react";

// interface User {
//   uid: string;
//   name?: string;
//   email: string;
//   role: "admin" | "mentor" | "interviewer" | "intern";
//   profilePicture?: string | null;
//   batch?: string | null;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (user: User) => void;     // only used after /login
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const BASE = "http://localhost:4000/interngo";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ⭐ Restore session from backend cookie
//   useEffect(() => {
//     async function checkSession() {
//       try {
//         const res = await fetch(`${BASE}/me`, {
//           method: "GET",
//           credentials: "include",       // ⭐ required
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser(data.user);           // backend returns user object
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     checkSession();
//   }, []);

//   // ⭐ Called ONLY after login page API success
//   const login = (userData: User) => {
//     setUser(userData);
//   };

//   // ⭐ Logout → remove cookies from backend + reset state
//   const logout = async () => {
//     try {
//       await fetch(`${BASE}/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch {}
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };





///dharan's use for db 




import React, { createContext, useContext, useEffect, useState } from "react";
const BASE = "http://localhost:4000/interngo"; // your backend URL
// ========================================
// USER TYPE
// ========================================
interface User {
  uid: string;
  name?: string;
  email: string;
  role: "admin" | "mentor" | "interviewer" | "intern";
  profilePicture?: string | null;
  batch?: string | null;
}
// ========================================
// AUTH CONTEXT TYPE
// ========================================
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}
// ========================================
// CONTEXT CREATION
// ========================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// ========================================
// PROVIDER
// ========================================
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // ----------------------------------------
  // :rocket: Restore logged-in user from backend cookie
  // ----------------------------------------
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
  // ----------------------------------------
  // :rocket: LOGIN — Only set user returned from /login
  // ----------------------------------------
  const login = (userData: User) => {
    setUser(userData);
  };
  // ----------------------------------------
  // :rocket: LOGOUT — Clears cookies via backend
  // ----------------------------------------
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
// ========================================
// CUSTOM HOOK
// ========================================
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};