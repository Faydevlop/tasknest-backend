import express from 'express';
import { createTasks, deleteTask, getinfo, getTasksList, updateTaskHandler } from '../controllers/taskController';
import authenticateJWT from '../utils/jwt';

const router = express.Router()

// Create task route
router.post('/create',authenticateJWT,createTasks)
// List tasks based on user / managers route
router.get('/gettasks',authenticateJWT,getTasksList)
// delete task route
router.delete('/:id',authenticateJWT,deleteTask)
// updatetask route
router.put('/:id',authenticateJWT,updateTaskHandler)
// dashboard info manager / employee
router.get('/info',authenticateJWT,getinfo)

export default router;