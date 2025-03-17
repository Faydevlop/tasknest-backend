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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPHandler = exports.register = exports.login = void 0;
const authService_1 = require("../services/authService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { user, token } = yield (0, authService_1.loginUser)(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const { email: registeredEmail } = yield (0, authService_1.registerUser)(name, email, password);
        res.status(201).json({ message: 'OTP Sent Successfully', email: registeredEmail });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.register = register;
const verifyOTPHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, tempEmail } = req.body;
    try {
        const { user, token } = yield (0, authService_1.verifyOTP)(otp, tempEmail);
        res.status(200).json({ message: 'Signin Successfully', token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.verifyOTPHandler = verifyOTPHandler;
