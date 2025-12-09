






// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import app from "../firebase";

// interface User {
//   uid: string;
//   email: string;
//   role: "admin" | "mentor" | "interviewer" | "intern";
//   token?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const auth = getAuth(app);

//   // ✅ Restore from Firebase Auth or LocalStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));

//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         const firebaseUserData: User = {
//           uid: firebaseUser.uid,
//           email: firebaseUser.email || "",
//           role: "intern", // default for Firebase sign-in (can be updated later)
//         };
//         setUser(firebaseUserData);
//         localStorage.setItem("user", JSON.stringify(firebaseUserData));
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };




// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";

interface User {
  uid: string;
  email: string;
  role: "admin" | "mentor" | "interviewer" | "intern";
  token?: string;
  profilePicture?: string; // ⭐ NEW — To load DP globally
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  // ⭐ Restore user from localStorage OR firebase
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const firebaseUserData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          role: "intern", // default for Firebase login (same as before)
          profilePicture: "", // ⭐ NEW — so DP field always exists
        };

        setUser(firebaseUserData);
        localStorage.setItem("user", JSON.stringify(firebaseUserData));
      }
    });

    return () => unsubscribe();
  }, []);

  // ⭐ LOGIN from backend (interngo/login)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ⭐ LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
