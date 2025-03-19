"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.tasksRouter = express_1.default.Router();
exports.tasksRouter.get("/tasks", (req, res) => {
    res.send("task a , task b, task c");
});
