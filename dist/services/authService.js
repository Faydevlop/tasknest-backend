"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.findByEmail)(email);
    if (!user)
        throw new Error('User not found , Please Sign in');
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
    return { user, token };
});
exports.loginUser = loginUser;
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield (0, userRepository_1.findByEmail)(email);
    if (userExists)
        throw new Error('a User already Exists in this email');
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    yield (0, userRepository_1.createUser)({
        name,
        email,
        otp,
        password: hashedPassword,
        otpExpires: otpExpiry,
    });
    yield (0, nodemailer_1.default)(email, otp);
    return { email };
});
exports.registerUser = registerUser;
const verifyOTP = (otp, tempEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.findByEmail)(tempEmail);
    if (!user) {
        throw new Error('User not found');
    }
    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
        throw new Error('Invalid or expired OTP');
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            isVerified: user.isVerified,
        },
        token,
    };
});
exports.verifyOTP = verifyOTP;
