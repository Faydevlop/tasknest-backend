import { listUsersbyManager, promoteUserToManager } from '../services/userServie.ts';
export const listUser = async (req, res) => {
    const managerId = req.user?.id;
    try {
        if (!managerId) {
            throw new Error("Manager ID is undefined");
        }
        const users = await listUsersbyManager(managerId);
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const promoteUser = async (req, res) => {
    // const managerId = req.user?.id
    try {
        const { selectedUser, selectedUserIds } = req.body;
        const user = await promoteUserToManager(selectedUser, selectedUserIds);
        res.status(200).json({ message: 'user promoted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
