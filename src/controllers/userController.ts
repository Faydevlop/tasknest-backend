import { Request, Response } from 'express';
import {  listUsersbyManager, promoteUserToManager } from '../services/userServie';
import { AuthenticatedRequest } from '../utils/jwt';

export const listUser = async(req:AuthenticatedRequest,res:Response)=>{
    const managerId = req.user?.id
    try {
        if (!managerId) {
            throw new Error("Manager ID is undefined");
        }
        const users = await listUsersbyManager(managerId);
        res.status(200).json({ users }); 
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}

export const promoteUser = async(req:AuthenticatedRequest,res:Response)=>{
    // const managerId = req.user?.id
    try {
        const {selectedUser,selectedUserIds} = req.body
    const user = await promoteUserToManager(selectedUser,selectedUserIds )
    res.status(200).json({ message:'user promoted' }); 
    } catch (error:any) {
        res.status(400).json({ message: error.message });
        
    }
}