import Task from "../models/Task";
import User from "../models/User";

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

    export const getInfoByUser = async (userId: string) => {
        try {
          const totalTasks = await Task.countDocuments({ assignedTo: userId });
          const completedTasks = await Task.countDocuments({
            assignedTo: userId,
            status: "completed",
          });
      
          return {
            totalTasks: totalTasks || 0,
            completedTasks: completedTasks || 0,
            totalEmployees: 0,

          };
        } catch (error) {
          console.error("Error fetching user task info:", error);
          throw error;
        }
      };

      export const getInfoByManager = async (userId: string) => {
        try {
          // Count total tasks assigned by the manager
          const totalTasks = await Task.countDocuments({ assignedBy: userId });
      
          // Count completed tasks assigned by the manager
          const completedTasks = await Task.countDocuments({
            assignedBy: userId,
            status: "completed",
          });
      
          // Count employees under this manager
          const totalEmployees = await User.countDocuments({ managerId: userId });
      
          return {
            totalTasks: totalTasks || 0,
            completedTasks: completedTasks || 0,
            totalEmployees: totalEmployees || 0,
          };
        } catch (error) {
          console.error("Error fetching manager info:", error);
          throw error;
        }
      };