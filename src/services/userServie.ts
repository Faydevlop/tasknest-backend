import mongoose from "mongoose";
import Task from "../models/Task.ts";
import User from "../models/User.ts";
import { assignManagerToUsers, findUsersWithSameManager, promoteUser } from "../repositories/userRepository.ts"


export const getTaskCountsByUserId = async (userId: string) => {
    const completedTasks = await Task.countDocuments({ assignedTo: userId, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: 'pending' });
  
    return { completed: completedTasks || 0, pending: pendingTasks || 0 };
  };

  export const listUsersbyManager = async (managerId: string) => {
    const users:any = await findUsersWithSameManager(managerId);
    if (!users || users.length === 0) throw new Error('Users not found');
  
    const userListWithTaskCounts = await Promise.all(
      users.map(async (user: any) => {
        const taskCounts = await getTaskCountsByUserId(user._id.toString());
        return { ...user.toObject(), taskCounts };
      })
    );
  
    return userListWithTaskCounts;
  };

  export const promoteUserToManager = async (selectedUser: string, selectedUserIds: string[]) => {

    try {
      await promoteUser(selectedUser);
      await assignManagerToUsers(selectedUserIds, selectedUser);
  
      return { success: true };
    } catch (error) {
      throw error;
    }
  };