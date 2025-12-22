import Task from "./task_model.js"
import User from "../user/user_model.js"; 


export const createupdatedeletetask = async (req, res) => {
  try {
    const { userId, taskDate } = req.params;
    const { tasks } = req.body;

    if (!Array.isArray(tasks)) {
      return res.status(400).json({ message: "Tasks array required" });
    }

    // Get existing tasks from DB
    const existingTasks = await Task.findAll({
      where: { userId, taskDate },
    });

    const existingTaskMap = new Map();
    existingTasks.forEach(task => {
      existingTaskMap.set(task.id, task);
    });

    const incomingTaskIds = new Set();

    // CREATE & UPDATE
    for (const task of tasks) {
      if (task.id && existingTaskMap.has(task.id)) {
        // UPDATE
        incomingTaskIds.add(task.id);

        await existingTaskMap.get(task.id).update({
          topic: task.topic,
          completedActivities: task.completedActivities,
          plannedActivities: task.plannedActivities,
          estimatedTime:task.estimatedTime,
          actualTime: task.actualTime,
          status: task.status,
        });
      } else {
        // CREATE (new task)
        await Task.create({
          userId,
          taskDate,
          topic: task.topic,
          plannedActivities: task.plannedActivities,
          estimatedTime: task.estimatedTime,
          completedActivities: task.completedActivities || "",
          actualTime: task.actualTime || null,
          status: task.status || "pending",
        });
      }
    }

    // DELETE (DB tasks missing in request)
    const tasksToDelete = existingTasks.filter(
      task => !incomingTaskIds.has(task.id)
    );

    await Promise.all(
      tasksToDelete.map(task => task.destroy())
    );

    return res.status(200).json({
      message: "Tasks synced successfully",
    });
  } catch (error) {
    console.error("syncTasks error:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const getTasksByUserAndDate = async (req, res) => {
  try {
    const { userId, taskDate } = req.params;

    const tasks = await Task.findAll({
      where: { userId, taskDate },
      order: [["createdAt", "ASC"]],
    });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }
    console.log(tasks)
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("getTasks error:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const getTasksByYearDate = async (req, res) => {
  try {
    const { year, date } = req.params;

    const users = await User.find(
      { year: year.toString() },  //isActive: true
    );

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    const userIds = users.map(user => user._id.toString());

    console.log(userIds)
    const tasks = await Task.findAll({
      where: {
        userId: userIds,     
        taskDate: date,
      },
      order: [["userId", "ASC"]],
    });
    console.log(tasks)
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json({ tasks });
  } 
  catch (error) {
    console.error("getTasksByYearDate error:", error);
    return res.status(500).json({ error: error.message });
  }
}
