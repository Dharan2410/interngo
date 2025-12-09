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