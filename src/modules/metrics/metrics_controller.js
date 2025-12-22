import Metrics from "./metrics_model.js"

export const getmetrics = async(req, res) => {
    try {
        const metrics = await Metrics.findAll();
        if(metrics.length === 0)
            return res.status(404).json({message:"no metrics"})
        return res.status(200).json({message:"metrics fetched successfully", metrics});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve metrics" });
    }
}

export const createUpdateMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, metrics } = req.body;

    if (!name || !type || !metrics) {
      return res.status(400).json({
        message: "name, type, and metrics are required",
      });
    }

    const metric = await Metrics.findByIdAndUpdate(
      id,
      { name, type, metrics },
      {
        new: true,     
        upsert: true,   
      }
    );

    const message = metric.createdAt
      ? "Metrics created successfully"
      : "Metrics updated successfully";

    return res.status(200).json({
      message,
      metric,
    });

  } catch (err) {
    console.error("createUpdateMetrics error:", err);
    return res.status(500).json({
      error: "Failed to create/update metrics",
    });
  }
};

export const deleteMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMetric = await Metrics.findByIdAndDelete(id);

    if (!deletedMetric) {
      return res.status(404).json({
        message: "Metrics not found",
      });
    }

    return res.status(200).json({
      message: "Metrics deleted successfully",
      metric: deletedMetric,
    });

  } catch (err) {
    console.error("deleteMetrics error:", err);
    return res.status(500).json({
      error: "Failed to delete metrics",
    });
  }
};

