import { loginUser } from "../services/authService.ts";
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
        
    } catch (error) {
        
    }

}