import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "interaction_scheduled",
        "feedback_received",
        "task_update",
        "attendance_marked",
        "general",
      ],
      default: "general",
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    meta: {
      type: Schema.Types.Mixed, // stores extra dynamic info (IDs, timestamps, etc.)
      default: {},
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String,
      default: "System", // optional; helps trace where it came from
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;