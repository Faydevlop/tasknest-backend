import User from "../models/User.ts";
const findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};
const createUser = async (userData) => {
    return User.create(userData);
};
const findUsersWithSameManager = async (managerId) => {
    const users = await User.find({ isVerified: true, managerId });
    return users;
};
// Promote a user to manager
export const promoteUser = async (selectedUser) => {
    return await User.findByIdAndUpdate(selectedUser, { role: 'Manager', managerId: null });
};
// Assign managerId to multiple users
export const assignManagerToUsers = async (selectedUserIds, selectedUser) => {
    return await User.updateMany({ _id: { $in: selectedUserIds } }, { managerId: selectedUser });
};
export { findByEmail, createUser, findUsersWithSameManager };
