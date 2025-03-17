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
exports.getInfoByManager = exports.getInfoByUser = exports.updateTask = exports.deleteTask = exports.findTasksByEmployee = exports.findTasksByManager = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const User_1 = __importDefault(require("../models/User"));
const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.create(taskData);
    return task;
});
exports.createTask = createTask;
const findTasksByManager = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find({ assignedBy: managerId }).populate('assignedTo');
    if (!tasks) {
        throw new Error('Task not found');
    }
    return tasks;
});
exports.findTasksByManager = findTasksByManager;
const findTasksByEmployee = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find({ assignedTo: employeeId });
    if (!tasks) {
        throw new Error('Task not found');
    }
    return tasks;
});
exports.findTasksByEmployee = findTasksByEmployee;
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.findByIdAndDelete(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
});
exports.deleteTask = deleteTask;
const updateTask = (taskId, taskData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(taskId, taskData, 'from deep');
    const mappedData = {
        title: taskData === null || taskData === void 0 ? void 0 : taskData.taskTitle,
        description: taskData === null || taskData === void 0 ? void 0 : taskData.taskDescription,
        status: taskData === null || taskData === void 0 ? void 0 : taskData.taskStatus,
    };
    const newTask = yield Task_1.default.findByIdAndUpdate(taskId, mappedData, { new: true });
    if (!newTask) {
        throw new Error('Task not found');
    }
    console.log(newTask);
    return newTask;
});
exports.updateTask = updateTask;
const getInfoByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalTasks = yield Task_1.default.countDocuments({ assignedTo: userId });
        const completedTasks = yield Task_1.default.countDocuments({
            assignedTo: userId,
            status: "completed",
        });
        return {
            totalTasks: totalTasks || 0,
            completedTasks: completedTasks || 0,
            totalEmployees: 0,
        };
    }
    catch (error) {
        console.error("Error fetching user task info:", error);
        throw error;
    }
});
exports.getInfoByUser = getInfoByUser;
const getInfoByManager = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Count total tasks assigned by the manager
        const totalTasks = yield Task_1.default.countDocuments({ assignedBy: userId });
        // Count completed tasks assigned by the manager
        const completedTasks = yield Task_1.default.countDocuments({
            assignedBy: userId,
            status: "completed",
        });
        // Count employees under this manager
        const totalEmployees = yield User_1.default.countDocuments({ managerId: userId });
        return {
            totalTasks: totalTasks || 0,
            completedTasks: completedTasks || 0,
            totalEmployees: totalEmployees || 0,
        };
    }
    catch (error) {
        console.error("Error fetching manager info:", error);
        throw error;
    }
});
exports.getInfoByManager = getInfoByManager;
