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
exports.handleGetInfoByManager = exports.handleGetInfoByUser = exports.handleUpdateTask = exports.findTaskAndDelete = exports.handleTaskListByUser = exports.handleTaskListByManager = exports.createTaskHandler = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
const createTaskHandler = (assignedBy, assignedTo, date, description, status, title) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, taskRepository_1.createTask)({ assignedBy, assignedTo, date, description, status, title });
    return task;
});
exports.createTaskHandler = createTaskHandler;
const handleTaskListByManager = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, taskRepository_1.findTasksByManager)(managerId);
    if (!tasks)
        throw new Error('No tasks found');
    return tasks;
});
exports.handleTaskListByManager = handleTaskListByManager;
const handleTaskListByUser = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, taskRepository_1.findTasksByEmployee)(employeeId);
    if (!tasks)
        throw new Error('No tasks found');
    return tasks;
});
exports.handleTaskListByUser = handleTaskListByUser;
const findTaskAndDelete = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedtask = yield (0, taskRepository_1.deleteTask)(taskId);
    if (!deletedtask)
        throw new Error('Tasks Not found');
    return deletedtask;
});
exports.findTaskAndDelete = findTaskAndDelete;
const handleUpdateTask = (taskId, taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield (0, taskRepository_1.updateTask)(taskId, taskData);
    if (!updatedTask)
        throw new Error('Tasks Not Found');
    return updatedTask;
});
exports.handleUpdateTask = handleUpdateTask;
const handleGetInfoByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const InfoOfUser = yield (0, taskRepository_1.getInfoByUser)(userId);
    if (!InfoOfUser)
        throw new Error('no info Found');
    return InfoOfUser;
});
exports.handleGetInfoByUser = handleGetInfoByUser;
const handleGetInfoByManager = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const infoOfManager = yield (0, taskRepository_1.getInfoByManager)(userId);
    if (!infoOfManager)
        throw new Error('no info found');
    return infoOfManager;
});
exports.handleGetInfoByManager = handleGetInfoByManager;
