import express from "express"
import { verifyToken, refreshAccessToken } from "../../middleware/auth.js"
import { createTask } from "./task_controller.js"

const router = express.Router()

router.create("/createTask", verifyToken, createTask)

export default router