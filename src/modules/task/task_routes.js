import express from "express"
import { verifyToken, refreshAccessToken } from "../../middleware/auth.js"
import {createupdatedeletetask, getTasksByUserAndDate,getTasksByYearDate} from "./task_controller.js"

const router = express.Router()

router.put("/:userId/:taskDate", createupdatedeletetask )
router.get("/getTasks/:userId/:taskDate", getTasksByUserAndDate)
router.get("/getTasksByYearDate/:year/:date", getTasksByYearDate)


export default router