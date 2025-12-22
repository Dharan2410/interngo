import jwt from "jsonwebtoken";

export const ACCESS_TOKEN_EXP = "1h";
export const REFRESH_TOKEN_EXP = "7d";

// Generate tokens
export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXP }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXP }
  );

  return { accessToken, refreshToken };
};

// Set HttpOnly cookies
export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,  
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, 
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,  
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
