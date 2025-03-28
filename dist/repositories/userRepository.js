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
exports.findUsersWithSameManager = exports.createUser = exports.findByEmail = exports.assignManagerToUsers = exports.promoteUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    return user;
});
exports.findByEmail = findByEmail;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.create(userData);
});
exports.createUser = createUser;
const findUsersWithSameManager = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({ isVerified: true, managerId });
    return users;
});
exports.findUsersWithSameManager = findUsersWithSameManager;
// Promote a user to manager
const promoteUser = (selectedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndUpdate(selectedUser, { role: 'Manager', managerId: null });
});
exports.promoteUser = promoteUser;
// Assign managerId to multiple users
const assignManagerToUsers = (selectedUserIds, selectedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.updateMany({ _id: { $in: selectedUserIds } }, { managerId: selectedUser });
});
exports.assignManagerToUsers = assignManagerToUsers;
