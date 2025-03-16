import { Request, Response } from 'express';
import { listUsers } from '../services/userServie.ts';

export const listUser = async(req:Request,res:Response)=>{

    try {
        const users = await listUsers()
        res.status(200).json({ users }); 
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}