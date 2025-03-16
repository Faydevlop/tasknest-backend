import express from 'express';
import { createTasks, deleteTask, getTasksList, updateTaskHandler } from '../controllers/taskController.ts';
import authenticateJWT from '../utils/jwt.ts';

const router = express.Router()

// Create task route
router.post('/create',authenticateJWT,createTasks)
// List tasks based on user / managers route
router.get('/gettasks',authenticateJWT,getTasksList)
// delete task route
router.delete('/:id',authenticateJWT,deleteTask)
// updatetask route
router.put('/:id',authenticateJWT,updateTaskHandler)

export default router;