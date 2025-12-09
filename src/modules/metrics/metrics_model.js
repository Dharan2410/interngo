import mongoose from "mongoose";

const { Schema } = mongoose;

const metricSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }, 

    type: {
      type: String,
      required: true
    },

    metrics: [
      {
        title: {
          type: String,
          required: true, 
        },
        maxScore: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

metricSchema.index({ type: 1 });
metricSchema.index({ isActive: 1 });

const MetricDefinition = mongoose.model("MetricDefinition", metricSchema);

export default MetricDefinition;