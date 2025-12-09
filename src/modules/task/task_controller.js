import Task from "./task_model"


export const createTask = async (req,res)=>{
    try{
        const userId = req.user.id
        const {taskName,plannedActivities,estimatedHours} = req.body

        const createTask = await Task.create({userId,taskName,plannedActivities,estimatedHours})
        res.status(200).json({
            message:"Task created successfully",
            task:createTask
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export const updateTask = async (req,res)=>{
    try{
        const taskId = req.params.id
        const {completedActivities,actualHours,taskStatus} = req.body

        const task = await Task.findByPk(taskId)
        if(!task)
            return res.status(404).json({message:"Task not found"})

        task.completedActivities = completedActivities || task.completedActivities
        task.actualHours = actualHours || task.actualHours
        task.taskStatus = taskStatus || task.taskStatus

        await task.save()

        res.status(200).json({
            message:"Task updated successfully",
            task
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export const getUserTasks = async (req,res)=>{
    try{
        const userId = req.user.id

        const tasks = await Task.findAll({where:{userId}})

        res.status(200).json({
            message:"User tasks fetched successfully",
            tasks
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export const deleteTask = async (req,res)=>{
    try{
        const taskId = req.params.id

        const task = await Task.findByPk(taskId)
        if(!task)
            return res.status(404).json({message:"Task not found"})

        await task.destroy()

        res.status(200).json({
            message:"Task deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}   