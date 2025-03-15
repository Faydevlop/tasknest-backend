
import { loginUser,registerUser,verifyOTP} from "../services/authService.ts";
import { Request, Response } from 'express';

export const login = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    
    try {
        const {user,token} = await loginUser(email,password)
        res.status(200).json({ user, token }); 
    } catch (error:any) {
        res.status(400).json({ message: error.message });
        
    }
}

export const register  = async(req:Request,res:Response)=>{
    const {name,email,password} = req.body;

    try {
        const {email: registeredEmail } =await registerUser(name,email,password)
        res.status(201).json({ message: 'OTP Sent Successfully', email: registeredEmail });
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }   
}


export const verifyOTPHandler = async(req:Request,res:Response)=>{
    const {otp,email} = req.body
    try {
        const {user, token} = await verifyOTP(otp,email)
        res.status(200).json({ message: 'Signin Successfully',token,user });
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}

