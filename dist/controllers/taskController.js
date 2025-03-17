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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getinfo = exports.updateTaskHandler = exports.deleteTask = exports.getTasksList = exports.createTasks = void 0;
const taskService_1 = require("../services/taskService");
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignedBy, assignedTo, date, description, status, title } = req.body;
    console.log(req.body);
    console.log(req.user);
    try {
        const task = yield (0, taskService_1.createTaskHandler)(assignedBy, assignedTo, date, description, status, title);
        res.status(200).json({ message: 'Task Created', task });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createTasks = createTasks;
const getTasksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        console.log('User is undefined');
        res.status(401).json({ message: 'Unauthorized access' });
        return;
    }
    const userId = req.user.id;
    const userRole = req.user.role;
    try {
        let tasks;
        if (userRole === 'Employee') {
            tasks = yield (0, taskService_1.handleTaskListByUser)(userId);
        }
        else if (userRole === 'Manager') {
            tasks = yield (0, taskService_1.handleTaskListByManager)(userId);
        }
        else {
            res.status(403).json({ message: 'Forbidden: Invalid Role' });
            return;
        }
        if (!tasks || tasks.length === 0) {
            res.status(404).json({ message: 'No tasks found' });
            return;
        }
        res.status(200).json({ message: 'Tasks fetching success', tasks });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getTasksList = getTasksList;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        yield (0, taskService_1.findTaskAndDelete)(taskId);
        res.status(200).json({ message: 'task deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
const updateTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { tasksId, taskTitle, taskDescription, taskStatus } = req.body;
    console.log(taskId, req.body, 'here');
    try {
        yield (0, taskService_1.handleUpdateTask)(taskId, { tasksId, taskTitle, taskDescription, taskStatus });
        res.status(200).json({ message: 'Task update success' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateTaskHandler = updateTaskHandler;
const getinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        console.log('User is undefined');
        res.status(401).json({ message: 'Unauthorized access' });
        return;
    }
    const userId = req.user.id;
    const userRole = req.user.role;
    try {
        let info;
        if (userRole === 'Employee') {
            info = yield (0, taskService_1.handleGetInfoByUser)(userId);
        }
        else if (userRole === 'Manager') {
            info = yield (0, taskService_1.handleGetInfoByManager)(userId);
        }
        else {
            res.status(403).json({ message: 'Forbidden: Invalid Role' });
            return;
        }
        if (!info) {
            res.status(404).json({ message: 'No info found' });
            return;
        }
        res.status(200).json({ message: 'get info success', info });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getinfo = getinfo;
