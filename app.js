import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport.js"
import cookieParser from "cookie-parser";
import sequelize from "./config/mysql_database.js";
import connectMongoDB from "./config/mongodb_database.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//import tables & collections 

import Attendance from "./src/modules/attendance/attendance_model.js"
import Feedback from "./src/modules/feedback/feedback_model.js"
import Interaction from "./src/modules/interaction/interaction_model.js";
import MetricDefinition from "./src/modules/metrics/metrics_model.js";
import Notification from "./src/modules/notification/notification _model.js";
import Task from "./src/modules/task/task_model.js";
import User from "./src/modules/user/user_model.js";

// Import Routes
import userRoutes from "./src/modules/user/user_routes.js";
import taskRoutes from "./src/modules/task/task_routes.js";
import attendanceRoutes from "./src/modules/attendance/attendance_routes.js";
import metricsRoutes from "./src/modules/metrics/metrics_routes.js"

// MySQL
sequelize
  .sync({ alter: true })
  .then(() => console.log("MySQL Database Synced"))
  .catch((err) => console.error("MySQL Sync Failed:", err));

//mongoDB
connectMongoDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});

app.use(cookieParser());
app.get("/main", (req,res)=>{
    res.send("hello from interngo")
})
app.use(passport.initialize());
app.use("/interngo", userRoutes)
app.use("/interngo/tasks", taskRoutes)
app.use("/interngo/attendance", attendanceRoutes)
app.use("/interngo/interaction",metricsRoutes)
