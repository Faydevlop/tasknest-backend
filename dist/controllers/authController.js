import { loginUser, registerUser, verifyOTP } from "../services/authService.ts";
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const { email: registeredEmail } = await registerUser(name, email, password);
        res.status(201).json({ message: 'OTP Sent Successfully', email: registeredEmail });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const verifyOTPHandler = async (req, res) => {
    const { otp, tempEmail } = req.body;
    try {
        const { user, token } = await verifyOTP(otp, tempEmail);
        res.status(200).json({ message: 'Signin Successfully', token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
