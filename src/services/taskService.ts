import { createTask ,findTasksByEmployee,findTasksByManager, deleteTask, updateTask, getInfoByUser, getInfoByManager} from '../repositories/taskRepository.ts';

export const createTaskHandler  = async(assignedBy:string,assignedTo:string,date:string,description:string,status:string,title:string)=>{
    const task = await createTask({assignedBy,assignedTo,date,description,status,title})
    return task
}
export const handleTaskListByManager = async(managerId:string)=>{
    const tasks = await findTasksByManager(managerId)
    if(!tasks) throw new Error('No tasks found')
    return tasks
}
export const handleTaskListByUser = async(employeeId:string)=>{
    const tasks = await findTasksByEmployee(employeeId)
    if(!tasks) throw new Error('No tasks found')
    return tasks
}

export const findTaskAndDelete = async(taskId:string)=>{
    const deletedtask = await deleteTask(taskId);
    if(!deletedtask)throw new Error('Tasks Not found')
    return deletedtask

}

export const handleUpdateTask = async(taskId:string,taskData:any)=>{
    const updatedTask = await updateTask(taskId,taskData)
    if(!updatedTask)throw new Error('Tasks Not Found')
    return updatedTask

}

export const handleGetInfoByUser = async(userId:string)=>{
    const InfoOfUser = await getInfoByUser(userId)
    if(!InfoOfUser) throw new Error('no info Found')
    return InfoOfUser
}

export const handleGetInfoByManager = async(userId:string)=>{
    const infoOfManager = await getInfoByManager(userId)
    if(!infoOfManager) throw new Error('no info found')
    return infoOfManager
}