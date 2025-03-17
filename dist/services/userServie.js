import Task from "../models/Task.ts";
import { assignManagerToUsers, findUsersWithSameManager, promoteUser } from "../repositories/userRepository.ts";
export const getTaskCountsByUserId = async (userId) => {
    const completedTasks = await Task.countDocuments({ assignedTo: userId, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: 'pending' });
    return { completed: completedTasks || 0, pending: pendingTasks || 0 };
};
export const listUsersbyManager = async (managerId) => {
    const users = await findUsersWithSameManager(managerId);
    if (!users || users.length === 0)
        throw new Error('Users not found');
    const userListWithTaskCounts = await Promise.all(users.map(async (user) => {
        const taskCounts = await getTaskCountsByUserId(user._id.toString());
        return { ...user.toObject(), taskCounts };
    }));
    return userListWithTaskCounts;
};
export const promoteUserToManager = async (selectedUser, selectedUserIds) => {
    try {
        await promoteUser(selectedUser);
        await assignManagerToUsers(selectedUserIds, selectedUser);
        return { success: true };
    }
    catch (error) {
        throw error;
    }
};
