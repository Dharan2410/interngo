import Attendance from "./attendance_model.js";
import sequelize from "../../../config/mysql_database.js";

export const saveAttendance = async (req, res) => {
  try {
    const { date, attendance, markedBy } = req.body;

    console.log(attendance)
    // 1️⃣ Validation
    if (!date) {
      return res.status(400).json({ message: "date is required" });
    }

    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({
        message: "attendance array is required",
      });
    }

    if (!markedBy) {
      return res.status(400).json({
        message: "markedBy is required",
      });
    }

    const payload = attendance
      .filter(
        (item) =>
          item.userId &&
          typeof item.userId === "string" &&
          item.userId.trim() !== ""
      )
      .map((item) => ({
        userId: item.userId.trim(),
        date,

        session1Status:
          String(item.session1).toLowerCase() === "present"
            ? "Present"
            : "Absent",

        session2Status:
          String(item.session2).toLowerCase() === "present"
            ? "Present"
            : "Absent",

        markedBy,
      }));

    if (payload.length === 0) {
      return res.status(400).json({
        message: "No valid attendance records to save",
      });
    }

    // 3️⃣ BULK UPSERT
    await Attendance.bulkCreate(payload, {
      updateOnDuplicate: [
        "session1Status",
        "session2Status",
        "overallStatus",
        "markedBy",
        "updatedAt",
      ],
      individualHooks: true,
    });

    return res.status(200).json({
      message: "Attendance saved successfully",
      saved: payload.length,
    });

  } catch (err) {
    console.error("saveAttendance error:", err);
    return res.status(500).json({
      message: "Failed to save attendance",
      error: err.message,
    });
  }
};



export const getattendancebydate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        message: "Date is required (YYYY-MM-DD)",
      });
    }
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findAll({
      where: { date },
    });

    if (date === today && attendance.length === 0) {
      return res.status(200).json({
        message: "No attendance marked yet for today",
        attendance: [],
      });
    }

    if (attendance.length === 0) {
      return res.status(404).json({
        message: "No attendance found for this date",
      });
    }

    return res.status(200).json({
      message: "Attendance fetched successfully",
      count: attendance.length,
      attendance,
    });

  } catch (err) {
    console.error("getattendancebydate error:", err);
    return res.status(500).json({ error: err.message});
  }
};
