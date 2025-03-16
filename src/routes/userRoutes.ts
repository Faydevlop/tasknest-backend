import express from 'express';
import { listUser } from '../controllers/userController.ts';

const router = express.Router()

// List Users 
router.get('/listallUsers',listUser)

export default router;