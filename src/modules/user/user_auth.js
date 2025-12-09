import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import admin from "../../../config/firebase_admin.js";
import User from "./user_model.js";
import { generateTokens, setAuthCookies } from "../../utils/tokens_utils.js";

const ACCESS_TOKEN_EXPIRY = "1h";
const REFRESH_TOKEN_EXPIRY = "7d";

// ------------------ REGISTER ------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "intern",
      authProvider: "manual",
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
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

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ------------------ GOOGLE LOGIN ------------------
export const googleLogin = async (req, res) => {
  try {
    const decoded = await admin.auth().verifyIdToken(req.body.token);
    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        profileImage: picture,
        authProvider: "google",
        role: "intern",
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: "Google login successful" });
  } catch (err) {
    res.status(401).json({ message: "Invalid Firebase token" });
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
