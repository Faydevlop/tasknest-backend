import express from 'express';
import { listUser, promoteUser } from '../controllers/userController.ts';
import authenticateJWT from '../utils/jwt.ts';

const router = express.Router()

// List Users by manager
router.get('/listallUsers',authenticateJWT,listUser)
// Promote user by manager
router.put('/promote',authenticateJWT,promoteUser)

export default router;