import Cluster from "../models/cluster.model.js";

export const getClusters = async (req, res) => {
  try {

    const clusters = await Cluster.find()
      .sort({ startTime: -1 });

    return res.status(200).json({
      success: true,
      count: clusters.length,
      clusters,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getClusterById = async (req, res) => {
  try {

    const cluster = await Cluster.findById(req.params.id)
      .populate("articles");

    if (!cluster) {
      return res.status(404).json({
        success: false,
        message: "Cluster not found",
      });
    }

    return res.status(200).json({
      success: true,
      cluster,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getTimeline = async (req, res) => {
  try {

    const query = {};

    // Optional source filter
    if (req.query.source) {
      query.sources = req.query.source;
    }

    // Only show recent clusters (last 48 hours)
    const since = new Date();
    since.setHours(since.getHours() - 48);

    query.endTime = {
      $gte: since,
    };

    const clusters = await Cluster.find(query)
      .sort({ startTime: 1 })
      .select(
        "label articleCount startTime endTime sources"
      );

    const timeline = clusters.map(cluster => ({
      id: cluster._id,
      label: cluster.label,
      startTime: cluster.startTime,
      endTime: cluster.endTime,
      articleCount: cluster.articleCount,
      intensity: cluster.articleCount,
      sources: cluster.sources,
    }));

    return res.status(200).json({
      success: true,
      timeline,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};