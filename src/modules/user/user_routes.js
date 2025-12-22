import express from "express";
import passport from "passport";
import {registerUser,loginUser,googleLogin} from "./user_auth.js";
import { editProfile, viewProfile , searchbyrole, getallProfiles} from "./user_controller.js";
import { verifyToken,refreshAccessToken } from "../../middleware/auth.js";
import upload from "../../middleware/upload.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", loginUser);
router.post("/generate_access",refreshAccessToken)
router.put("/editprofile/:userId",upload.single("profileImage"),editProfile)
router.get("/profile/:userId", viewProfile)
router.get("/getallProfiles", getallProfiles)
 
router.get( 
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/signin" }),
  googleLogin
);

router.get("/me", verifyToken, (req, res) => {
  res.json({
    user: {
      uid: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profilePicture: req.user.profileImage || null,
    }
  });
});

export default router;
