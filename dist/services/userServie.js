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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoteUserToManager = exports.listUsersbyManager = exports.getTaskCountsByUserId = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const userRepository_1 = require("../repositories/userRepository");
const getTaskCountsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const completedTasks = yield Task_1.default.countDocuments({ assignedTo: userId, status: 'completed' });
    const pendingTasks = yield Task_1.default.countDocuments({ assignedTo: userId, status: 'pending' });
    return { completed: completedTasks || 0, pending: pendingTasks || 0 };
});
exports.getTaskCountsByUserId = getTaskCountsByUserId;
const listUsersbyManager = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userRepository_1.findUsersWithSameManager)(managerId);
    if (!users || users.length === 0)
        throw new Error('Users not found');
    const userListWithTaskCounts = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const taskCounts = yield (0, exports.getTaskCountsByUserId)(user._id.toString());
        return Object.assign(Object.assign({}, user.toObject()), { taskCounts });
    })));
    return userListWithTaskCounts;
});
exports.listUsersbyManager = listUsersbyManager;
const promoteUserToManager = (selectedUser, selectedUserIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, userRepository_1.promoteUser)(selectedUser);
        yield (0, userRepository_1.assignManagerToUsers)(selectedUserIds, selectedUser);
        return { success: true };
    }
    catch (error) {
        throw error;
    }
});
exports.promoteUserToManager = promoteUserToManager;
