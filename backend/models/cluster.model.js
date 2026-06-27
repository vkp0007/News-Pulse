import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    articleCount: {
      type: Number,
      required: true,
      default: 0,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    sources: [
      {
        type: String,
        enum: ["BBC", "NPR", "AlJazeera", ],
      },
    ],

    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cluster", clusterSchema);