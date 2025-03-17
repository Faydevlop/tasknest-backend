"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const jwt_1 = __importDefault(require("../utils/jwt"));
const router = express_1.default.Router();
// List Users by manager
router.get('/listallUsers', jwt_1.default, userController_1.listUser);
// Promote user by manager
router.put('/promote', jwt_1.default, userController_1.promoteUser);
exports.default = router;
