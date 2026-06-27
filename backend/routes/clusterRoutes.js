import express from "express";

import {
  getClusters,
  getClusterById,
  getTimeline,
} from "../controllers/clusterController.js";

const router = express.Router();

router.get("/", getClusters);

router.get("/timeline", getTimeline);

router.get("/:id", getClusterById);

export default router;