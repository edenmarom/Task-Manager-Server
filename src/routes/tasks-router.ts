import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask, getTasksByUserId } from "../controllers/tasks-controller";
import { validatePartialTask, validateTask, validateTaskId } from "../validations/task-schema-validation";
import { validateUserId } from "../validations/user-schema-validation";
import { verifyToken } from "../middlewares/jwt-middleware";

export const tasksRouter = express.Router();

tasksRouter.get("/getAllTasks",verifyToken, getAllTasks);
tasksRouter.get("/getTaskById/:id",verifyToken, validateTaskId, getTask);
tasksRouter.get("/getTasksByUserId/:id", verifyToken,validateUserId, getTasksByUserId);
tasksRouter.post("/createTask",verifyToken, validateTask, createTask);
tasksRouter.put(
  "/updateTask/:id",
  verifyToken,
  validateTaskId,
  validatePartialTask,
  updateTask
);
tasksRouter.delete("/deleteTask/:id", verifyToken,validateTaskId, deleteTask);


