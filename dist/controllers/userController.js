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
exports.promoteUser = exports.listUser = void 0;
const userServie_1 = require("../services/userServie");
const listUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const managerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!managerId) {
            throw new Error("Manager ID is undefined");
        }
        const users = yield (0, userServie_1.listUsersbyManager)(managerId);
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.listUser = listUser;
const promoteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const managerId = req.user?.id
    try {
        const { selectedUser, selectedUserIds } = req.body;
        const user = yield (0, userServie_1.promoteUserToManager)(selectedUser, selectedUserIds);
        res.status(200).json({ message: 'user promoted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.promoteUser = promoteUser;
