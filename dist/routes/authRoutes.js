"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// User Login Route
router.post('/login', authController_1.login);
// User Signup Route
router.post('/register', authController_1.register);
// OTP Verification Route
router.post('/verifyOTP', authController_1.verifyOTPHandler);
exports.default = router;
