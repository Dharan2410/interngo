import sequelize from "../../../config/mysql_database.js";
import { DataTypes } from "sequelize";

const Interaction = sequelize.define("Interaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  internId: {
    type: DataTypes.STRING(24), 
    allowNull:false
  },

  mentorId: {
    type: DataTypes.STRING(24),
    allowNull: true,
  },

  interviewerId: {
    type: DataTypes.STRING(24), 
    allowNull: false,
  },

  scheduledBy: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false, 
  },

  startTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  endTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  huddleLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM("Scheduled", "Pending", "Completed"),
    defaultValue: "Scheduled",
  },

  remarks: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "interaction",
  timestamps: true,
});

export default Interaction;
