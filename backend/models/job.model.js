import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    articlesProcessed: {
      type: Number,
      default: 0,
    },

    clustersCreated: {
      type: Number,
      default: 0,
    },

    error: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);