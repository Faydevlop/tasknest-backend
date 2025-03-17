import express from 'express';
import { login, register, verifyOTPHandler } from '../controllers/authController.ts';
const router = express.Router();
// User Login Route
router.post('/login', login);
// User Signup Route
router.post('/register', register);
// OTP Verification Route
router.post('/verifyOTP', verifyOTPHandler);
export default router;
