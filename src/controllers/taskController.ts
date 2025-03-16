import { Request, Response } from 'express';
import { createTaskHandler, handleTaskListByManager, handleTaskListByUser , findTaskAndDelete ,handleUpdateTask } from '../services/taskService.ts';
import { AuthenticatedRequest } from '../utils/jwt.ts';

export const createTasks = async(req:AuthenticatedRequest,res:Response)=>{
    const { assignedBy,assignedTo,date,description,status,title} = req.body;
    console.log(req.body);
    console.log(req.user);
    
    
    try {
        const task = await createTaskHandler (assignedBy,assignedTo,date,description,status,title);
        res.status(200).json({message:'Task Created',task})
    } catch (error:any) {
        res.status(400).json({ message: error.message });
        
    }
}


export const getTasksList = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      console.log('User is undefined');
      res.status(401).json({ message: 'Unauthorized access' });
      return;
    }
  
    const userId = req.user.id;
    const userRole = req.user.role;
  
    try {
      let tasks;
  
      if (userRole === 'Employee') {
        tasks = await handleTaskListByUser(userId);
      } else if (userRole === 'Manager') {
        tasks = await handleTaskListByManager(userId);
      } else {
        res.status(403).json({ message: 'Forbidden: Invalid Role' });
        return;
      }
  
      if (!tasks || tasks.length === 0) {
        res.status(404).json({ message: 'No tasks found' });
        return;
      }
      
      
      res.status(200).json({ message: 'Tasks fetching success', tasks });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  export const deleteTask = async(req:Request,res:Response)=>{
    const taskId = req.params.id
    try {
      await findTaskAndDelete(taskId)
      res.status(200).json({message:'task deleted'})
    } catch (error:any) {
      res.status(400).json({ message: error.message });
      
    }
  }

  export const updateTaskHandler  = async(req:Request,res:Response)=>{
    const taskId = req.params.id
    const {tasksId,taskTitle,taskDescription,taskStatus} = req.body;
    console.log(taskId,req.body,'here');
    
    try {
    await handleUpdateTask(taskId,{tasksId,taskTitle,taskDescription,taskStatus})
    res.status(200).json({ message: 'Task update success' });
      
    } catch (error:any) {
      res.status(400).json({ message: error.message });
      
    }
  }