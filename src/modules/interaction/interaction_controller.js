import Interaction from "./interaction_model"

export const createupdateInteraction = async (req, res) => {
  try {
    const {
      id,             
      internId,
      mentorId,
      interviewerId,
      scheduledBy,
      type,
      scheduledAt,
      startTime,
      endTime,
      huddleLink,
      status,
      remarks,
    } = req.body;

    if (!internId || !interviewerId || !scheduledBy || !type || !scheduledAt) {
      return res.status(400).json({
        message: "internId, interviewerId, scheduledBy, type, scheduledAt are required",
      });
    }

    const payload = {
      internId,
      mentorId,
      interviewerId,
      scheduledBy,
      type,
      scheduledAt,
      startTime,
      endTime,
      huddleLink,
      status,
      remarks,
    };
    
    const [interaction, created] = await Interaction.upsert(
      id ? { id, ...payload } : payload,
      { returning: true }
    );

    return res.status(200).json({
      message: created
        ? "Interaction created successfully"
        : "Interaction updated successfully",
      interaction,
    });

  } catch (err) {
    console.error("createupdateInteraction error:", err);
    return res.status(500).json({
      message: "Failed to create/update interaction",
      error: err.message,
    });
  }
};


export const viewInteraction = async (req, res) => {
  try {
    const { id, internId, mentorId, interviewerId, status } = req.query;

    const where = {};

    if (id) where.id = id;
    if (internId) where.internId = internId;
    if (mentorId) where.mentorId = mentorId;
    if (interviewerId) where.interviewerId = interviewerId;
    if (status) where.status = status;

    const interactions = await Interaction.findAll({
      where,
      order: [["scheduledAt", "DESC"]],
    });

    return res.status(200).json({
      count: interactions.length,
      interactions,
    });

  } catch (err) {
    console.error("viewInteraction error:", err);
    return res.status(500).json({
      message: "Failed to fetch interactions",
      error: err.message,
    });
  }
};


export const deleteInteraction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Interaction id is required",
      });
    }

    const deleted = await Interaction.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Interaction not found",
      });
    }

    return res.status(200).json({
      message: "Interaction deleted successfully",
    });

  } catch (err) {
    console.error("deleteInteraction error:", err);
    return res.status(500).json({
      message: "Failed to delete interaction",
      error: err.message,
    });
  }
};
