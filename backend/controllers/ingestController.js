import Job from "../models/job.model.js";
import ingestService from "../services/ingestService.js";

export const triggerIngestion = async (req, res) => {
  try {
    // Create a new job
    const job = await Job.create({
      status: "running",
      startedAt: new Date(),
    });

    try {
      const result = await ingestService();

      job.status = "completed";
      job.finishedAt = new Date();
      job.articlesProcessed = result.articlesProcessed;
      job.clustersCreated = result.clustersCreated;

      await job.save();

      return res.status(200).json({
        success: true,
        jobId: job._id,
        ...result,
      });

    } catch (err) {

      job.status = "failed";
      job.finishedAt = new Date();
      job.error = err.message;

      await job.save();

      throw err;
    }

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getJobStatus = async (req, res) => {

  try {

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.json({
      success: true,
      job,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};