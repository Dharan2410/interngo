import sequelize from "../../../config/mysql_database.js";
import { DataTypes } from "sequelize";

const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  interactionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  metricsId: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  totalMark: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  zone: {
    type: DataTypes.ENUM("green", "yellow", "red"),
    allowNull: false,
  },
  feedbackDetails: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
}, {
  tableName: "feedback",
  timestamps: true,
});

export default Feedback;
