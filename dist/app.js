"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const frontendUrl = process.env.FRONTEND_URL;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: frontendUrl,
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/task', taskRoutes_1.default);
exports.default = app;
