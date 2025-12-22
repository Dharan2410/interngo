import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./user_model.js";
import { generateTokens, setAuthCookies } from "../../utils/tokens_utils.js";

const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "7d";

// ------------------ REGISTER ------------------
export const registerUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
      authProvider: "manual",
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error occurred" });
  }
};


// ------------------ LOGIN ------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials." });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        uid: user.id,                
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ------------------ GOOGLE LOGIN ------------------

const FRONTEND_CALLBACK = "http://localhost:5173/auth/google/callback";

export const googleLogin = async (req, res) => 
  {
  try {
    if (!req.user) {
      return res.redirect("/signin");
    }

    const user = req.user;

    const email = user.email || user.emails?.[0]?.value;
    if (!email) {
      console.error("googleLogin: email missing from passport profile", user);
      // Fallback: redirect to signin with error query param (or show an error)
      return res.redirect("/signin?error=google_no_email");
    }

      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name || user.displayName || "",
          profileImage: user.profileImage || user.photos?.[0]?.value || "",
          authProvider: "google",
          role: user.role || "intern",
        });
      }

      const { accessToken, refreshToken } = generateTokens(dbUser);
      dbUser.refreshToken = refreshToken;
      await dbUser.save();

      // set cookies (httpOnly)
      setAuthCookies(res, accessToken, refreshToken);

      // Redirect to frontend callback page with token and metadata in query params
      const redirectUrl =
        `${FRONTEND_CALLBACK}` +
        `?token=${encodeURIComponent(accessToken)}` +
        `&uid=${encodeURIComponent(String(dbUser._id))}` +
        `&role=${encodeURIComponent(dbUser.role)}` +
        `&email=${encodeURIComponent(dbUser.email || "")}` +
        `&picture=${encodeURIComponent(dbUser.profileImage || "")}`;

      return res.redirect(redirectUrl);
    } catch (err) {
    return res.status(500).json({ message: "Google login failed" });
  }
};


// ------------------ REFRESH TOKEN ------------------
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Create NEW access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Update access cookie only
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token refreshed" });
  } catch (err) {
    return res.status(401).json({ message: "Refresh token expired, login again" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = req.user;
    user.refreshToken = null;
    await user.save();

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};
