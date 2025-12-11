import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");
    const uid = searchParams.get("uid");
    const email = searchParams.get("email");
    const profilePicture = searchParams.get("picture"); // optional

    if (!token || !role || !uid) {
      navigate("/signin");
      return;
    }

    // Store user
    login({
      uid,
      email: email || "",
      role: role as any,
      profilePicture: profilePicture || "",
    });

    // Redirect based on role
    const roleRoutes: Record<string, string> = {
      admin: "/admin/dashboard",
      intern: "/intern/dashboard",
      mentor: "/mentor/dashboard",
      interviewer: "/interviewer/dashboard",
    };

    navigate(roleRoutes[role] || "/");
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center text-xl">
      Authenticating with Google...
    </div>
  );
};

export default GoogleCallback;
