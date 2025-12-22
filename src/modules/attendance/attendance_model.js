import sequelize from "../../../config/mysql_database.js";
import { DataTypes } from "sequelize";

const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  session1Status: {
    type: DataTypes.ENUM("Present", "Absent"),
    allowNull: false,
    defaultValue: "Present",
  },

  session2Status: {
    type: DataTypes.ENUM("Present", "Absent"),
    allowNull: false,
    defaultValue: "Present",
  },

  overallStatus: {
    type: DataTypes.ENUM("Present", "Half Day", "Absent"),
    allowNull: false,
  },

  markedBy: {
    type: DataTypes.STRING(24), // MongoDB _id of admin/mentor
    allowNull: false,
  },
}, {
  tableName: "attendance",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["userId", "date"],
    },
  ],
});

// Automatically compute overallStatus before saving
Attendance.beforeCreate((record) => {
  const { session1Status, session2Status } = record;
  if (session1Status === "Present" && session2Status === "Present") {
    record.overallStatus = "Present";
  } else if (session1Status === "Absent" && session2Status === "Absent") {
    record.overallStatus = "Absent";
  } else {
    record.overallStatus = "Half Day";
  }
});

Attendance.beforeUpdate((record) => {
  const { session1Status, session2Status } = record;
  if (session1Status === "Present" && session2Status === "Present") {
    record.overallStatus = "Present";
  } else if (session1Status === "Absent" && session2Status === "Absent") {
    record.overallStatus = "Absent";
  } else {
    record.overallStatus = "Half Day";
  }
});

export default Attendance;
