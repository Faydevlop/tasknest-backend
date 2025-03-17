"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const jwt_1 = __importDefault(require("../utils/jwt"));
const router = express_1.default.Router();
// Create task route
router.post('/create', jwt_1.default, taskController_1.createTasks);
// List tasks based on user / managers route
router.get('/gettasks', jwt_1.default, taskController_1.getTasksList);
// delete task route
router.delete('/:id', jwt_1.default, taskController_1.deleteTask);
// updatetask route
router.put('/:id', jwt_1.default, taskController_1.updateTaskHandler);
// dashboard info manager / employee
router.get('/info', jwt_1.default, taskController_1.getinfo);
exports.default = router;
