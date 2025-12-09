import jwt from "jsonwebtoken";
import User from "../modules/user/user_model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired. Please use refresh token to get a new one.",
      });
    }
    return res.status(403).json({ message: "Invalid token." });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required." });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshTokens !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token." });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
