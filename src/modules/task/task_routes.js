import express from "express"
import { verifyToken, refreshAccessToken } from "../../middleware/auth.js"
import { createTask,updateTask,getUserTasks,deleteTask } from "./task_controller.js"

const router = express.Router()

router.post("/createTask", verifyToken, createTask)
router.post("/generate_access", refreshAccessToken) 
router.get("/getTasks", verifyToken, getUserTasks)
router.patch("/updateTask/:id", verifyToken, updateTask)
router.delete("/deleteTask/:id", verifyToken, deleteTask)

export default router