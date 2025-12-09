import express from "express";
import {registerUser,loginUser,googleLogin} from "./user_auth.js";
import { editProfile } from "./user_controller.js";
import { verifyToken,refreshAccessToken } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/generate_access",refreshAccessToken)
router.post("/editprofile",verifyToken,editProfile)

export default router;
