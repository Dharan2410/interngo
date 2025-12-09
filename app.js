import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/mysql_database.js";
import connectMongoDB from "./config/mongodb_database.js";
dotenv.config();

const app = express();


app.use(cors());
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


app.get("/main", (req,res)=>{
    res.send("hello from interngo")
})

app.use("/api/users", userRoutes)