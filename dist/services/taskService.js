import { createTask, findTasksByEmployee, findTasksByManager, deleteTask, updateTask, getInfoByUser, getInfoByManager } from '../repositories/taskRepository.ts';
export const createTaskHandler = async (assignedBy, assignedTo, date, description, status, title) => {
    const task = await createTask({ assignedBy, assignedTo, date, description, status, title });
    return task;
};
export const handleTaskListByManager = async (managerId) => {
    const tasks = await findTasksByManager(managerId);
    if (!tasks)
        throw new Error('No tasks found');
    return tasks;
};
export const handleTaskListByUser = async (employeeId) => {
    const tasks = await findTasksByEmployee(employeeId);
    if (!tasks)
        throw new Error('No tasks found');
    return tasks;
};
export const findTaskAndDelete = async (taskId) => {
    const deletedtask = await deleteTask(taskId);
    if (!deletedtask)
        throw new Error('Tasks Not found');
    return deletedtask;
};
export const handleUpdateTask = async (taskId, taskData) => {
    const updatedTask = await updateTask(taskId, taskData);
    if (!updatedTask)
        throw new Error('Tasks Not Found');
    return updatedTask;
};
export const handleGetInfoByUser = async (userId) => {
    const InfoOfUser = await getInfoByUser(userId);
    if (!InfoOfUser)
        throw new Error('no info Found');
    return InfoOfUser;
};
export const handleGetInfoByManager = async (userId) => {
    const infoOfManager = await getInfoByManager(userId);
    if (!infoOfManager)
        throw new Error('no info found');
    return infoOfManager;
};
