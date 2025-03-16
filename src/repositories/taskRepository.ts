import Task from "../models/Task.ts";

export const createTask = async(taskData:any)=>{
    const task = await Task.create(taskData)
    return task
}

export const findTasksByManager = async(managerId:string)=>{
    const tasks = await Task.find({assignedBy:managerId}).populate('assignedTo')
    if (!tasks) {
        throw new Error('Task not found');
      }
    return tasks
}

export const findTasksByEmployee = async (employeeId: string) => {
    const tasks = await Task.find({ assignedTo: employeeId });
    if (!tasks) {
        throw new Error('Task not found');
      }
    return tasks;
};

export const deleteTask = async(taskId:string)=>{
    const task = await Task.findByIdAndDelete(taskId)
    if (!task) {
        throw new Error('Task not found');
      }
    return task
}

    export const updateTask = async(taskId:string,taskData:any)=>{
    console.log(taskId,taskData,'from deep');
    const mappedData = {
        title: taskData?.taskTitle,
        description: taskData?.taskDescription,
        status: taskData?.taskStatus,
      };

        const newTask = await Task.findByIdAndUpdate(taskId,mappedData,{new:true})
        if (!newTask) {
            throw new Error('Task not found');
        }
        console.log(newTask);
        
        return newTask
    }