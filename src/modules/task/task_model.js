import sequelize from "../../../config/mysql_database.js";
import { DataTypes } from "sequelize";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  userId: {
    type: DataTypes.STRING(24), 
    required:true
  },

  taskName: {
    type: DataTypes.TEXT,
    allowNull: false,
    required:true
  },

  plannedActivities: {
    type: DataTypes.TEXT,
    allowNull: false,
    required:true
  },

  completedActivities: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  estimatedHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required:true
  },

  actualHours: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  taskStatus: {
    type: DataTypes.ENUM("Pending", "Completed"),
    defaultValue: "Pending",
  },

  taskDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
},
{
  timestamps: true,
  tableName: "task",
});

export default Task;
