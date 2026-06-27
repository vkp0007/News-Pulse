import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      enum: ["BBC", "NPR", "AlJazeera"],
    },

    publishedAt: {
      type: Date,
      required: true,
      index: true,
    },

    cluster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cluster",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleSchema);