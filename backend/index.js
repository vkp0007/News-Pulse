import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnection } from "./config/databaseConnection.js";
dotenv.config();
import ingestRoutes from "./routes/ingestRoutes.js";
import clusterRoutes from "./routes/clusterRoutes.js";




const PORT = process.env.PORT || 8000;


const app = express();

app.use(cors());
app.use(express.json());

databaseConnection();


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "News Pulse API Running",
  });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/ingest", ingestRoutes);
app.use("/api/clusters", clusterRoutes);


